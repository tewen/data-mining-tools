/* tslint:disable:no-expression-statement no-unused-expression */
import { expect } from 'chai';
import { tryCatch } from 'deep-cuts';
import path from 'path';
import { filesExist } from './file';
import {
  cleanupFiles,
  createTemporaryFiles,
  TEMP_FILES_DIRECTORY
} from './specHelpers';

describe('file', () => {
  describe('filesExist()', () => {
    it('returns true if passed no arguments', async () => {
      expect(await filesExist()).to.be.true;
    });

    it('throws an error if passed undefined', async () => {
      const { error } = await tryCatch(() => filesExist(undefined));
      expect(String(error)).to.contain(
        'undefined does not exist in the file system.'
      );
    });

    it('throws an error if passed null', async () => {
      const { error } = await tryCatch(() => filesExist(null));
      expect(String(error)).to.contain(
        'null does not exist in the file system.'
      );
    });

    it('throws an error if passed a non-existent file', async () => {
      const filepath = path.join(TEMP_FILES_DIRECTORY, 'koolaid.txt');
      const { error } = await tryCatch(() => filesExist(filepath));
      expect(String(error)).to.contain(
        `${filepath} does not exist in the file system.`
      );
    });

    it('throws an error if passed one non-existent file among several', async () => {
      const files = await createTemporaryFiles(2);
      const filepath = path.join(TEMP_FILES_DIRECTORY, 'koolaid.txt');
      const { error } = await tryCatch(() =>
        filesExist(...files.concat(filepath))
      );
      expect(String(error)).to.contain(
        `${filepath} does not exist in the file system.`
      );
      await cleanupFiles(...files);
    });

    it('throws an error if passed multiple non-existent files, error is based on the first', async () => {
      const filepathA = path.join(TEMP_FILES_DIRECTORY, 'koolaid.txt');
      const filepathB = path.join(TEMP_FILES_DIRECTORY, 'koolaid2.txt');
      const { error } = await tryCatch(() => filesExist(filepathA, filepathB));
      expect(String(error)).to.contain(
        `${filepathA} does not exist in the file system.`
      );
    });

    it('returns true if passed a single existing file', async () => {
      const files = await createTemporaryFiles(1);
      expect(await filesExist(...files)).to.be.true;
      await cleanupFiles(...files);
    });

    it('returns true if passed multiple existing files', async () => {
      const files = await createTemporaryFiles(3);
      expect(await filesExist(...files)).to.be.true;
      await cleanupFiles(...files);
    });
  });
});
