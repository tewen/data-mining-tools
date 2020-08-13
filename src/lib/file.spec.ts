// tslint:disable:no-expression-statement
import test from 'ava';
import fs from 'fs-extra';
import path from 'path';
import { filesExist } from './file';
import { timeout } from './time';

const TEMP_FILES_DIRECTORY: string = 'tmp/test/files';

async function createTemporaryFiles(
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

test.afterEach.always(async () => {
  if (await fs.exists(TEMP_FILES_DIRECTORY)) {
    await timeout(1000);
    await fs.remove(TEMP_FILES_DIRECTORY);
  }
});

test('returns true if passed no arguments', async t => {
  t.is(await filesExist(), true);
});

test('throws an error if passed undefined', async t => {
  const err = await t.throwsAsync(() => filesExist(undefined));
  t.true(
    String(err).indexOf('undefined does not exist in the file system.') !== -1
  );
});

test('throws an error if passed null', async t => {
  const err = await t.throwsAsync(() => filesExist(null));
  t.true(String(err).indexOf('null does not exist in the file system.') !== -1);
});

test('throws an error if passed a non-existent file', async t => {
  const filepath = path.join(TEMP_FILES_DIRECTORY, 'koolaid.txt');
  const err = await t.throwsAsync(() => filesExist(filepath));
  t.true(
    String(err).indexOf(`${filepath} does not exist in the file system.`) !== -1
  );
});

test('throws an error if passed one non-existent file among several', async t => {
  const files = await createTemporaryFiles(2);
  const filepath = path.join(TEMP_FILES_DIRECTORY, 'koolaid.txt');
  const err = await t.throwsAsync(() => filesExist(...files.concat(filepath)));
  t.true(
    String(err).indexOf(`${filepath} does not exist in the file system.`) !== -1
  );
});

test('throws an error if passed multiple non-existent files, error is based on the first', async t => {
  const filepathA = path.join(TEMP_FILES_DIRECTORY, 'koolaid.txt');
  const filepathB = path.join(TEMP_FILES_DIRECTORY, 'koolaid2.txt');
  const err = await t.throwsAsync(() => filesExist(filepathA, filepathB));
  t.true(
    String(err).indexOf(`${filepathA} does not exist in the file system.`) !==
      -1
  );
});

test('returns true if passed a single existing file', async t => {
  const files = await createTemporaryFiles(1);
  t.is(await filesExist(...files), true);
});

test('returns true if passed multiple existing files', async t => {
  const files = await createTemporaryFiles(3);
  t.is(await filesExist(...files), true);
});
