import fs from 'fs-extra';
import { parse } from 'fast-csv';
import path from 'path';
import { csvRowsToObjects, objectsToCsvRows, safeJsonParse } from 'deep-cuts';
import { Readable } from 'stream';

function escapeDoubleQuotes(str: string): string {
  return ((str && String(str)) || '').replace(/"/g, '""');
}

export function cleanFilename(
  filename: string | number | Date,
  slashReplacement: string = '_'
): string {
  return (() => {
    if (filename === undefined || filename === null || Number.isNaN(filename)) {
      return '';
    } else if (filename instanceof Date) {
      return filename.toLocaleString();
    } else {
      return String(filename);
    }
  })()
    .replace(/(\/|\\)/gi, slashReplacement)
    .trim();
}

export async function filesExist(...files: string[]): Promise<boolean> {
  // @ts-ignore
  const allExist: ReadonlyArray<boolean> = await Promise.all(
    // @ts-ignore
    files.map((file: string) => fs.exists(file))
  );
  return allExist.every((exists, idx) => {
    return (
      exists ||
      (() => {
        const error: string = `${files[idx]} does not exist in the file system.`;
        throw new Error(error);
      })()
    );
  });
}

export async function filesAsJson(
  fileOrDirectoryPath: string,
  filter?: ((filename: string) => Promise<boolean>) | RegExp
): Promise<object | null> {
  const lstat = await fs.lstat(fileOrDirectoryPath);
  if (lstat.isDirectory()) {
    const files = await fs.readdir(fileOrDirectoryPath);
    if (files && files.length) {
      const fileContents = await Promise.all(
        files.map(file => {
          const filepath = path.join(fileOrDirectoryPath, file);
          return filesAsJson(filepath, filter);
        })
      );
      return fileContents.reduce((acc, content) => {
        if (!acc) {
          return content;
        } else if (Array.isArray(acc)) {
          return content ? acc.concat(content) : acc;
        }
        return {
          // @ts-ignore
          ...acc,
          ...content,
        };
      }) as object;
    } else {
      return null;
    }
  } else {
    if (
      !filter ||
      (filter instanceof RegExp
        ? filter.test(fileOrDirectoryPath)
        : await filter(fileOrDirectoryPath))
    ) {
      return safeJsonParse(await fs.readFile(fileOrDirectoryPath, 'utf-8'));
    } else {
      return null;
    }
  }
}

function csvStringFromJsonArray(
  ar: Array<object>,
  headerOrdering: Array<string> = []
): string {
  const headingToIndex: Record<string, number> = headerOrdering.reduce(
    (acc: Record<string, number>, heading: string, idx: number) => {
      acc[heading] = idx;
      return acc;
    },
    {} as Record<string, number>
  );
  const sortForIndex: Record<string, number> = {};
  const rows: string = objectsToCsvRows(ar)
    .map((row: string[], idx: number) => {
      const sorted = (() => {
        let rowIdx = 0; /* tslint:disable-line:no-let */
        if (headerOrdering && headerOrdering.length) {
          return row.sort((a: string, b: string) => {
            // HEADER ROW
            if (idx === 0) {
              const aSort: number = headingToIndex[a];
              const bSort: number = headingToIndex[b];
              const sort: number = (() => {
                if (aSort < bSort) {
                  return -1;
                } else if (aSort > bSort) {
                  return 1;
                }
                return 0;
              })();
              sortForIndex[rowIdx++] = sort;
              return sort;
            }
            return sortForIndex[rowIdx++];
          });
        }
        return row;
      })();
      return sorted
        .map((val: string) => `"${escapeDoubleQuotes(val)}"`)
        .join(',');
    })
    .join('\n');
  return rows;
}

export async function jsonArrayToCsvFile(
  filepath: string,
  ar: Array<object>,
  headerOrdering: Array<string> = []
): Promise<string> {
  const rows = csvStringFromJsonArray(ar, headerOrdering);

  await fs.writeFile(filepath, rows);

  return rows;
}

export function jsonArrayToCsvBuffer(
  ar: Array<object>,
  headerOrdering: Array<string> = []
): Buffer {
  const rows = csvStringFromJsonArray(ar, headerOrdering);
  return Buffer.from(rows, 'utf-8');
}

export function jsonArrayToCsvStream(
  ar: Array<object>,
  headerOrdering: Array<string> = []
): Readable {
  const rows = csvStringFromJsonArray(ar, headerOrdering);
  return Readable.from(rows);
}

export async function csvFileToJsonArray(
  filepath: string
): Promise<Array<object>> {
  // Comment for testing
  return new Promise((resolve, reject) => {
    const rows: any[] = [];
    return fs
      .createReadStream(filepath)
      .pipe(parse())
      .on('error', err => reject(err))
      .on('data', row => rows.push(row))
      .on('end', () => resolve(csvRowsToObjects(rows)));
  });
}
