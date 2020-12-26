import fs from 'fs-extra';
import { parse } from 'fast-csv';
import path from 'path';
import { csvRowsToObjects, objectsToCsvRows, safeJsonParse } from 'deep-cuts';

export async function filesExist(
  ...files: ReadonlyArray<string>
): Promise<boolean> {
  const allExist: ReadonlyArray<boolean> = await Promise.all(
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
  filter: ((filename: string) => Promise<boolean>) | RegExp = null
): Promise<object> {
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
          ...content
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

export async function jsonArrayToCsvFile(
  filepath: string,
  ar: Array<object>,
  headerOrdering: Array<string> = []
): Promise<string> {
  const headingToIndex: object = headerOrdering.reduce(
    (acc: object, heading: string, idx: number) => {
      acc[
        heading
      ] = idx; /* tslint:disable-line:no-expression-statement no-object-mutation */
      return acc;
    },
    {}
  );
  const sortForIndex: object = {};
  const rows: string = objectsToCsvRows(ar)
    .map((row, idx) => {
      const sorted = (() => {
        let rowIdx = 0; /* tslint:disable-line:no-let */
        if (headerOrdering && headerOrdering.length) {
          return row.sort((a, b) => {
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
              sortForIndex[
                rowIdx++
              ] = sort; /* tslint:disable-line:no-expression-statement no-object-mutation */
              return sort;
            }
            return sortForIndex[rowIdx++];
          });
        }
        return row;
      })();
      return sorted.map(val => `"${val}"`).join(',');
    })
    .join('\n');

  await fs.writeFile(
    filepath,
    rows
  ); /* tslint:disable-line:no-expression-statement */

  return rows;
}

export async function csvFileToJsonArray(
  filepath: string
): Promise<Array<object>> {
  // Comment for testing
  return new Promise((resolve, reject) => {
    const rows = [];
    return fs
      .createReadStream(filepath)
      .pipe(parse())
      .on('error', err => reject(err))
      .on('data', row => rows.push(row))
      .on('end', () => resolve(csvRowsToObjects(rows)));
  });
}
