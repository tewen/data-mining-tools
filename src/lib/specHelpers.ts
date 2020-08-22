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

export async function cleanupFiles(...args): Promise<any> {
  await timeout(150);
  return Promise.all(args.map(file => fs.remove(file)));
}
