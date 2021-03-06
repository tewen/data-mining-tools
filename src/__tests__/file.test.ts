import { tryCatch } from 'deep-cuts';
import fs from 'fs-extra';
import path from 'path';
import {
  filesExist,
  filesAsJson,
  jsonArrayToCsvFile,
  csvFileToJsonArray,
} from '../';
import {
  cleanupFiles,
  createTemporaryFiles,
  createJsonFile,
  createTemporaryJsonFiles,
  TEMP_FILES_DIRECTORY,
} from './specHelpers';
import { timeout } from '../';

describe('file', () => {
  describe('filesExist()', () => {
    it('returns true if passed no arguments', async () => {
      expect(await filesExist()).toBe(true);
    });

    it('throws an error if passed undefined', async () => {
      // @ts-ignore
      const { error } = await tryCatch(() => filesExist(undefined));
      expect(String(error)).toContain(
        'undefined does not exist in the file system.'
      );
    });

    it('throws an error if passed null', async () => {
      // @ts-ignore
      const { error } = await tryCatch(() => filesExist(null));
      expect(String(error)).toContain(
        'null does not exist in the file system.'
      );
    });

    it('throws an error if passed a non-existent file', async () => {
      const filepath = path.join(TEMP_FILES_DIRECTORY, 'koolaid.txt');
      const { error } = await tryCatch(() => filesExist(filepath));
      expect(String(error)).toContain(
        `${filepath} does not exist in the file system.`
      );
    });

    it('throws an error if passed one non-existent file among several', async () => {
      const files = await createTemporaryFiles(2);
      const filepath = path.join(TEMP_FILES_DIRECTORY, 'koolaid.txt');
      const { error } = await tryCatch(() =>
        filesExist(...files.concat(filepath))
      );
      expect(String(error)).toContain(
        `${filepath} does not exist in the file system.`
      );
      await cleanupFiles(...files);
    });

    it('throws an error if passed multiple non-existent files, error is based on the first', async () => {
      const filepathA = path.join(TEMP_FILES_DIRECTORY, 'koolaid.txt');
      const filepathB = path.join(TEMP_FILES_DIRECTORY, 'koolaid2.txt');
      const { error } = await tryCatch(() => filesExist(filepathA, filepathB));
      expect(String(error)).toContain(
        `${filepathA} does not exist in the file system.`
      );
    });

    it('returns true if passed a single existing file', async () => {
      const files = await createTemporaryFiles(1);
      expect(await filesExist(...files)).toBe(true);
      await cleanupFiles(...files);
    });

    it('returns true if passed multiple existing files', async () => {
      const files = await createTemporaryFiles(3);
      expect(await filesExist(...files)).toBe(true);
      await cleanupFiles(...files);
    });
  });

  describe.skip('filesAsJson()', () => {
    it('should throw an error if the file does not exist', async () => {
      const { error } = await tryCatch(() => filesAsJson('non/existent.json'));
      expect(String(error)).toContain('no such file or directory');
    });

    it('should return null if the file is not JSON format', async () => {
      const [filepath] = await createTemporaryFiles(1);
      const result = await filesAsJson(filepath);
      expect(result).toBeNull();
      await cleanupFiles(filepath);
    });

    it('should parse a single JSON file if provided an exact path', async () => {
      const [filepath] = await createTemporaryJsonFiles([{ name: 'Lemmy' }]);
      const result = await filesAsJson(filepath);
      expect(result).toEqual({ name: 'Lemmy' });
      await cleanupFiles(filepath);
    });

    it('should not care about the extension', async () => {
      const filepath = await createJsonFile(
        path.join(TEMP_FILES_DIRECTORY, 'no/json/extension'),
        [1, 2, 3]
      );
      const result = await filesAsJson(filepath);
      expect(result).toEqual([1, 2, 3]);
      await cleanupFiles(filepath);
    });

    it('should be able to merge all the JSON files in a directory, if the first one parsed is an object', async () => {
      const files = await createTemporaryJsonFiles([
        { name: 'Lemmy' },
        { last: 'Kilmister' },
        {
          job: 'Rock & Roll',
          hobbies: ['WWII', 'Cognac', 'Literature'],
        },
      ]);
      const result = await filesAsJson(TEMP_FILES_DIRECTORY);
      expect(result).toEqual({
        name: 'Lemmy',
        last: 'Kilmister',
        job: 'Rock & Roll',
        hobbies: ['WWII', 'Cognac', 'Literature'],
      });
      await cleanupFiles(...files);
    });

    it('should be able to concat all the JSON files in a directory, if the first one parse is an array', async () => {
      const files = await createTemporaryJsonFiles([
        [{ name: 'Lemmy' }],
        [{ last: 'Kilmister' }],
        [
          {
            job: 'Rock & Roll',
            hobbies: ['WWII', 'Cognac', 'Literature'],
          },
        ],
      ]);
      const result = await filesAsJson(TEMP_FILES_DIRECTORY);
      expect(result).toEqual([
        { name: 'Lemmy' },
        { last: 'Kilmister' },
        {
          job: 'Rock & Roll',
          hobbies: ['WWII', 'Cognac', 'Literature'],
        },
      ]);
      await cleanupFiles(...files);
    });

    it('should be recursive and able to descend through directories', async () => {
      const files = await createTemporaryJsonFiles([
        [{ name: 'Lemmy' }],
        [{ last: 'Kilmister' }],
      ]);
      const deeperFile = await createJsonFile(
        path.join(TEMP_FILES_DIRECTORY, 'deeper/file/path'),
        [{ country: 'England' }]
      );
      const result = await filesAsJson(TEMP_FILES_DIRECTORY);
      expect(result).toEqual([
        { name: 'Lemmy' },
        { last: 'Kilmister' },
        { country: 'England' },
      ]);
      await cleanupFiles(...files.concat(deeperFile));
    });

    it('should be able to filter files based on the regular expression passed in', async () => {
      const files = await createTemporaryJsonFiles([
        { name: 'Lemmy' },
        { last: 'Kilmister' },
        {
          job: 'Rock & Roll',
          hobbies: ['WWII', 'Cognac', 'Literature'],
        },
      ]);
      const result = await filesAsJson(TEMP_FILES_DIRECTORY, /(1|3)\.json/gi);
      expect(result).toEqual({
        name: 'Lemmy',
        job: 'Rock & Roll',
        hobbies: ['WWII', 'Cognac', 'Literature'],
      });
      await cleanupFiles(...files);
    });

    it('should be able to filter files based on the sync filter function passed in', async () => {
      const files = await createTemporaryJsonFiles([
        { name: 'Lemmy' },
        { last: 'Kilmister' },
        {
          job: 'Rock & Roll',
          hobbies: ['WWII', 'Cognac', 'Literature'],
        },
      ]);
      const result = await filesAsJson(
        TEMP_FILES_DIRECTORY,
        // @ts-ignore
        filename => filename.indexOf('1') !== -1
      );
      expect(result).toEqual({
        name: 'Lemmy',
      });
      await cleanupFiles(...files);
    });

    it('should be able to filter files based on the async filter function passed in', async () => {
      const files = await createTemporaryJsonFiles([
        { name: 'Lemmy' },
        { last: 'Kilmister' },
        {
          job: 'Rock & Roll',
          hobbies: ['WWII', 'Cognac', 'Literature'],
        },
      ]);
      const result = await filesAsJson(TEMP_FILES_DIRECTORY, async filename => {
        await timeout(1);
        return /(2|3)\.json/gi.test(filename);
      });
      expect(result).toEqual({
        last: 'Kilmister',
        job: 'Rock & Roll',
        hobbies: ['WWII', 'Cognac', 'Literature'],
      });
      await cleanupFiles(...files);
    });
  });

  describe('jsonArrayToCsvFile()', () => {
    it('should write a blank file if passed an empty array', async () => {
      const filepath = path.join(TEMP_FILES_DIRECTORY, '1.csv');
      await jsonArrayToCsvFile(filepath, []);
      const contents = await fs.readFile(filepath, 'utf-8');
      expect(contents).toEqual('');
    });

    it('should write objects out with their headers aligned', async () => {
      const filepath = path.join(TEMP_FILES_DIRECTORY, '1.csv');
      await jsonArrayToCsvFile(filepath, [
        {
          color: 'Red',
          flavor: 'Cherry',
        },
        {
          color: 'Blue',
          flavor: 'Raspberry',
        },
        {
          color: 'Green',
          flavor: 'Apple',
        },
      ]);
      const contents = (await fs.readFile(filepath, 'utf-8')).split('\n');
      expect(contents[0]).toEqual('"color","flavor"');
      expect(contents[1]).toEqual('"Red","Cherry"');
      expect(contents[2]).toEqual('"Blue","Raspberry"');
      expect(contents[3]).toEqual('"Green","Apple"');
      await cleanupFiles(filepath);
    });

    it('should not require headers to be the same', async () => {
      const filepath = path.join(TEMP_FILES_DIRECTORY, '1.csv');
      await jsonArrayToCsvFile(filepath, [
        {
          color: 'Red',
          fresh: true,
          flavor: 'Cherry',
        },
        {
          color: 'Blue',
          flavor: 'Raspberry',
        },
        {
          color: 'Green',
          flavor: 'Apple',
        },
      ]);
      const contents = (await fs.readFile(filepath, 'utf-8')).split('\n');
      expect(contents[0]).toEqual('"color","fresh","flavor"');
      expect(contents[1]).toEqual('"Red","true","Cherry"');
      expect(contents[2]).toEqual('"Blue","","Raspberry"');
      expect(contents[3]).toEqual('"Green","","Apple"');
      await cleanupFiles(filepath);
    });

    it('should play nice with deeper properties', async () => {
      const filepath = path.join(TEMP_FILES_DIRECTORY, '1.csv');
      await jsonArrayToCsvFile(filepath, [
        {
          color: 'Red',
          flavor: {
            name: 'Cherry',
            region: 'NorthEast',
          },
        },
        {
          color: 'Blue',
          flavor: {
            name: 'Raspberry',
            region: 'SouthEast',
          },
        },
        {
          color: 'Green',
          flavor: {
            name: 'Apple',
            region: 'NorthWest',
          },
        },
      ]);
      const contents = (await fs.readFile(filepath, 'utf-8')).split('\n');
      expect(contents[0]).toEqual('"color","flavor.name","flavor.region"');
      expect(contents[1]).toEqual('"Red","Cherry","NorthEast"');
      expect(contents[2]).toEqual('"Blue","Raspberry","SouthEast"');
      expect(contents[3]).toEqual('"Green","Apple","NorthWest"');
      await cleanupFiles(filepath);
    });

    it('should be able to sort correctly to the given header ordering', async () => {
      const filepath = path.join(TEMP_FILES_DIRECTORY, '1.csv');
      await jsonArrayToCsvFile(
        filepath,
        [
          {
            color: 'Red',
            flavor: {
              name: 'Cherry',
              region: 'NorthEast',
            },
          },
          {
            color: 'Blue',
            flavor: {
              name: 'Raspberry',
              region: 'SouthEast',
            },
          },
          {
            color: 'Green',
            flavor: {
              name: 'Apple',
              region: 'NorthWest',
            },
          },
        ],
        ['flavor.region', 'color', 'flavor.name']
      );
      const contents = (await fs.readFile(filepath, 'utf-8')).split('\n');
      expect(contents[0]).toEqual('"flavor.region","color","flavor.name"');
      expect(contents[1]).toEqual('"NorthEast","Red","Cherry"');
      expect(contents[2]).toEqual('"SouthEast","Blue","Raspberry"');
      expect(contents[3]).toEqual('"NorthWest","Green","Apple"');
      await cleanupFiles(filepath);
    });

    it('should return the parsed rows as an array of arrays', async () => {
      const filepath = path.join(TEMP_FILES_DIRECTORY, '1.csv');
      const rows = await jsonArrayToCsvFile(
        filepath,
        [
          {
            color: 'Red',
            flavor: {
              name: 'Cherry',
              region: 'NorthEast',
            },
          },
          {
            color: 'Blue',
            flavor: {
              name: 'Raspberry',
              region: 'SouthEast',
            },
          },
          {
            color: 'Green',
            flavor: {
              name: 'Apple',
              region: 'NorthWest',
            },
          },
        ],
        ['flavor.region', 'color', 'flavor.name']
      );
      const contents = rows.split('\n');
      expect(contents[0]).toEqual('"flavor.region","color","flavor.name"');
      expect(contents[1]).toEqual('"NorthEast","Red","Cherry"');
      expect(contents[2]).toEqual('"SouthEast","Blue","Raspberry"');
      expect(contents[3]).toEqual('"NorthWest","Green","Apple"');
      await cleanupFiles(filepath);
    });
  });

  describe('csvFileToJsonArray()', () => {
    it('should map the rows into objects using the headers', async () => {
      const filepath = path.join(TEMP_FILES_DIRECTORY, '1.csv');
      await fs.writeFile(
        filepath,
        [
          '"color","flavor"',
          '"Red","Cherry"',
          '"Blue","Raspberry"',
          '"Green","Apple"',
        ].join('\n')
      );
      const result = await csvFileToJsonArray(filepath);
      expect(result).toEqual([
        {
          color: 'Red',
          flavor: 'Cherry',
        },
        {
          color: 'Blue',
          flavor: 'Raspberry',
        },
        {
          color: 'Green',
          flavor: 'Apple',
        },
      ]);
      await cleanupFiles(filepath);
    });

    it('should respect dot properties in the headers', async () => {
      const filepath = path.join(TEMP_FILES_DIRECTORY, '1.csv');
      await fs.writeFile(
        filepath,
        [
          '"flavor.region","color","flavor.name"',
          '"NorthEast","Red","Cherry"',
          '"SouthEast","Blue","Raspberry"',
          '"NorthWest","Green","Apple"',
        ].join('\n')
      );
      const result = await csvFileToJsonArray(filepath);
      expect(result).toEqual([
        {
          color: 'Red',
          flavor: {
            name: 'Cherry',
            region: 'NorthEast',
          },
        },
        {
          color: 'Blue',
          flavor: {
            name: 'Raspberry',
            region: 'SouthEast',
          },
        },
        {
          color: 'Green',
          flavor: {
            name: 'Apple',
            region: 'NorthWest',
          },
        },
      ]);
      await cleanupFiles(filepath);
    });
  });
});
