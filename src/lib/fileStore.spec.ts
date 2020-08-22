/* tslint:disable:no-expression-statement readonly-array array-type */
import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'path';
import { ArrayFileStore, ObjectFileStore } from './fileStore';
import { cleanupFiles, TEMP_FILES_DIRECTORY } from './specHelpers';

// Generic FileStore
describe('fileStore', () => {
  describe('FileStore()', () => {
    describe('read()', () => {
      it('should create the file with the default contents provided to the constructor', async () => {
        const objectPath = path.join(
          TEMP_FILES_DIRECTORY,
          'test-1-object.json'
        );
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-1-array.json');
        await new ObjectFileStore(objectPath).read();
        await new ArrayFileStore(arrayPath).read();
        const objectContent: object = JSON.parse(
          await fs.readFile(objectPath, 'utf-8')
        );
        const arrayContent: Array<any> = JSON.parse(
          await fs.readFile(arrayPath, 'utf-8')
        );
        expect(objectContent).to.eql({});
        expect(arrayContent).to.eql([]);
        await cleanupFiles(objectPath, arrayPath);
      });

      it('should create the file with the possibility of overriding the default contents', async () => {
        const objectPath = path.join(
          TEMP_FILES_DIRECTORY,
          'test-2-object.json'
        );
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-2-array.json');
        await new ObjectFileStore(objectPath, { id: 1 }).read();
        await new ArrayFileStore(arrayPath, [{ id: 1 }]).read();
        const objectContent: object = JSON.parse(
          await fs.readFile(objectPath, 'utf-8')
        );
        const arrayContent: Array<any> = JSON.parse(
          await fs.readFile(arrayPath, 'utf-8')
        );
        expect(objectContent).to.eql({ id: 1 });
        expect(arrayContent).to.eql([{ id: 1 }]);
        await cleanupFiles(objectPath, arrayPath);
      });

      it('should play nice with an existing file', async () => {
        const objectPath = path.join(
          TEMP_FILES_DIRECTORY,
          'test-3-object.json'
        );
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-3-array.json');
        await fs.writeFile(objectPath, JSON.stringify({ existing: true }));
        await fs.writeFile(arrayPath, JSON.stringify([{ existing: true }]));
        await new ObjectFileStore(objectPath).read();
        await new ArrayFileStore(arrayPath).read();
        const objectContent: object = JSON.parse(
          await fs.readFile(objectPath, 'utf-8')
        );
        const arrayContent: Array<any> = JSON.parse(
          await fs.readFile(arrayPath, 'utf-8')
        );
        expect(objectContent).to.eql({ existing: true });
        expect(arrayContent).to.eql([{ existing: true }]);
        await cleanupFiles(objectPath, arrayPath);
      });

      it('should return the parsed contents of the file', async () => {
        const objectPath = path.join(
          TEMP_FILES_DIRECTORY,
          'test-4-object.json'
        );
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-4-array.json');
        expect(await new ObjectFileStore(objectPath, { id: 1 }).read()).to.eql({
          id: 1
        });
        expect(await new ArrayFileStore(arrayPath, [{ id: 1 }]).read()).to.eql([
          { id: 1 }
        ]);
        await cleanupFiles(objectPath, arrayPath);
      });
    });

    describe('write()', () => {
      it('write() should place the contents into the file', async () => {
        const objectPath = path.join(
          TEMP_FILES_DIRECTORY,
          'test-5-object.json'
        );
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-5-array.json');
        const objectFileStore = new ObjectFileStore(objectPath);
        const arrayFileStore = new ArrayFileStore(arrayPath);
        await objectFileStore.write({ id: 20, name: 'Bill' });
        await arrayFileStore.write([{ id: 20, name: 'Bill' }]);
        expect(await objectFileStore.read()).to.eql({ id: 20, name: 'Bill' });
        expect(await arrayFileStore.read()).to.eql([{ id: 20, name: 'Bill' }]);
        expect(await JSON.parse(await fs.readFile(objectPath, 'utf-8'))).to.eql(
          {
            id: 20,
            name: 'Bill'
          }
        );
        expect(await JSON.parse(await fs.readFile(arrayPath, 'utf-8'))).to.eql([
          {
            id: 20,
            name: 'Bill'
          }
        ]);
        await cleanupFiles(objectPath, arrayPath);
      });

      it('write() should return the parsed contents of the file', async () => {
        const objectPath = path.join(
          TEMP_FILES_DIRECTORY,
          'test-6-object.json'
        );
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-6-array.json');
        expect(await new ObjectFileStore(objectPath).write({ id: 5 })).to.eql({
          id: 5
        });
        expect(await new ArrayFileStore(arrayPath).write([{ id: 5 }])).to.eql([
          { id: 5 }
        ]);
        await cleanupFiles(objectPath, arrayPath);
      });
    });
  });

  describe('ObjectFileStore()', () => {
    describe('merge()', () => {
      it('merge() should do a deep merge of the new contents', async () => {
        const objectPath = path.join(
          TEMP_FILES_DIRECTORY,
          'test-7-object.json'
        );
        const objectFileStore = new ObjectFileStore(objectPath, {
          id: 1,
          name: { first: 'Ronnie', last: 'Dio' }
        });
        await objectFileStore.merge({ name: { last: 'Jackson' } });
        expect(await objectFileStore.read()).to.eql({
          id: 1,
          name: { first: 'Ronnie', last: 'Jackson' }
        });
        await cleanupFiles(objectPath);
      });

      it('merge() should play nice with multiple arguments', async () => {
        const objectPath = path.join(
          TEMP_FILES_DIRECTORY,
          'test-8-object.json'
        );
        const objectFileStore = new ObjectFileStore(objectPath, {
          id: 1,
          name: { first: 'Ronnie', last: 'Dio' }
        });
        await objectFileStore.merge(
          { name: { last: 'Jackson' } },
          { tree: { type: 'Pine' } }
        );
        expect(await objectFileStore.read()).to.eql({
          id: 1,
          name: { first: 'Ronnie', last: 'Jackson' },
          tree: { type: 'Pine' }
        });
        await cleanupFiles(objectPath);
      });

      it('merge() should always return the latest read from the file', async () => {
        const objectPath = path.join(
          TEMP_FILES_DIRECTORY,
          'test-9-object.json'
        );
        const objectFileStore = new ObjectFileStore(objectPath, {
          id: 1,
          name: { first: 'Ronnie', last: 'Dio' }
        });
        expect(
          await objectFileStore.merge(
            { name: { last: 'Jackson' } },
            { tree: { type: 'Pine' } }
          )
        ).to.eql({
          id: 1,
          name: { first: 'Ronnie', last: 'Jackson' },
          tree: { type: 'Pine' }
        });
        await cleanupFiles(objectPath);
      });
    });
  });

  describe('ArrayFileStore()', () => {
    describe('concat()', () => {
      it('should play nice with a single item', async () => {
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-7-array.json');
        const arrayFileStore = new ArrayFileStore(arrayPath, [{ id: 5 }]);
        await arrayFileStore.concat({ id: 6 });
        expect(await arrayFileStore.read()).to.eql([{ id: 5 }, { id: 6 }]);
        await cleanupFiles(arrayPath);
      });

      it('should play nice with arrays as input', async () => {
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-8-array.json');
        const arrayFileStore = new ArrayFileStore(arrayPath, [{ id: 5 }]);
        await arrayFileStore.concat([{ id: 6 }, { id: 7 }]);
        expect(await arrayFileStore.read()).to.eql([
          { id: 5 },
          { id: 6 },
          { id: 7 }
        ]);
        await cleanupFiles(arrayPath);
      });

      it('should always return the latest read from the file', async () => {
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-9-array.json');
        const arrayFileStore = new ArrayFileStore(arrayPath, [{ id: 5 }]);
        expect(await arrayFileStore.concat([{ id: 6 }, { id: 7 }])).to.eql([
          { id: 5 },
          { id: 6 },
          { id: 7 }
        ]);
        await cleanupFiles(arrayPath);
      });
    });

    describe('updateBy()', () => {
      it('should add the item to the collection if it is not found by the key', async () => {
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-10-array.json');
        const arrayFileStore = new ArrayFileStore(arrayPath, [{ id: 5 }]);
        expect(await arrayFileStore.concat([{ id: 6 }, { id: 7 }])).to.eql([
          { id: 5 },
          { id: 6 },
          { id: 7 }
        ]);
        await cleanupFiles(arrayPath);
      });

      it('should overwrite the existing record by default', async () => {
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-11-array.json');
        const arrayFileStore = new ArrayFileStore(arrayPath, [
          {
            id: 5,
            name: { first: 'Bob' }
          },
          {
            id: 6,
            name: { first: 'Mike' }
          }
        ]);
        await arrayFileStore.updateBy('id', { id: 6, name: { title: 'Mr.' } });
        expect(await arrayFileStore.read()).to.eql([
          {
            id: 5,
            name: { first: 'Bob' }
          },
          {
            id: 6,
            name: { title: 'Mr.' }
          }
        ]);
        await cleanupFiles(arrayPath);
      });

      it('should be able to do a deep merge when updateByMerge is set to true', async () => {
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-12-array.json');
        const arrayFileStore = new ArrayFileStore(arrayPath, [
          {
            id: 5,
            name: { first: 'Bob' }
          },
          {
            id: 6,
            name: { first: 'Mike' }
          }
        ]);
        await arrayFileStore.updateBy(
          'id',
          { id: 6, name: { title: 'Mr.' } },
          true
        );
        expect(await arrayFileStore.read()).to.eql([
          {
            id: 5,
            name: { first: 'Bob' }
          },
          {
            id: 6,
            name: { title: 'Mr.', first: 'Mike' }
          }
        ]);
        await cleanupFiles(arrayPath);
      });

      it('should always return the latest read from the file', async () => {
        const arrayPath = path.join(TEMP_FILES_DIRECTORY, 'test-13-array.json');
        const arrayFileStore = new ArrayFileStore(arrayPath, [
          {
            id: 5,
            name: { first: 'Bob' }
          },
          {
            id: 6,
            name: { first: 'Mike' }
          }
        ]);
        expect(
          await arrayFileStore.updateBy(
            'id',
            { id: 6, name: { title: 'Mr.' } },
            true
          )
        ).to.eql([
          {
            id: 5,
            name: { first: 'Bob' }
          },
          {
            id: 6,
            name: { title: 'Mr.', first: 'Mike' }
          }
        ]);
        await cleanupFiles(arrayPath);
      });
    });
  });
});
