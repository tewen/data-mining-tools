/* tslint:disable:no-expression-statement */
import fs from 'fs-extra';
import path from 'path';
import { timeout } from './time';

export const TEMP_FILES_DIRECTORY: string = 'tmp/test/files';

export async function createTemporaryFiles(
  count: number = 5,
  files: ReadonlyArray<string> = []
): Promise<ReadonlyArray<string>> {
  if (count > 0) {
    const filepath: string = path.join(TEMP_FILES_DIRECTORY, `${count}.txt`);
    await fs.mkdirp(TEMP_FILES_DIRECTORY);
    await fs.writeFile(filepath, '');
    return createTemporaryFiles(count - 1, files.concat(filepath));
  } else {
    return files;
  }
}

export async function createJsonFile(
  filepath: string,
  jsonObject: object
): Promise<string> {
  await fs.mkdirp(path.dirname(filepath));
  await fs.writeFile(filepath, JSON.stringify(jsonObject, null, 2));
  return filepath;
}

export async function createTemporaryJsonFiles(
  jsonObjects: ReadonlyArray<object>,
  files: ReadonlyArray<string> = []
): Promise<ReadonlyArray<string>> {
  if (jsonObjects.length) {
    const jsonObject: object = jsonObjects[0];
    const count: number = files.length + 1;
    const filepath: string = path.join(TEMP_FILES_DIRECTORY, `${count}.json`);
    await createJsonFile(filepath, jsonObject);
    return createTemporaryJsonFiles(
      jsonObjects.slice(1),
      files.concat(filepath)
    );
  } else {
    return files;
  }
}

export async function cleanupFiles(...args): Promise<any> {
  await timeout(150);
  return Promise.all(args.map(file => fs.remove(file)));
}
