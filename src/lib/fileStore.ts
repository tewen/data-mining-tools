/* tslint:disable:no-expression-statement no-class no-this max-classes-per-file array-type readonly-array */
import { merge, safeJsonParse } from 'deep-cuts';
import fs from 'fs-extra';
import path from 'path';

class FileStore {
  public static async readOrCreateFile(
    file: string,
    encoding: string = 'utf-8',
    contents: string = ''
  ): Promise<string> {
    if (!(await fs.exists(file))) {
      await fs.mkdirp(path.dirname(file));
      await fs.writeFile(file, contents);
    }
    return fs.readFile(file, encoding);
  }

  public readonly file: string;
  public readonly encoding: string = 'utf-8';
  public readonly defaultContent: object;

  constructor(file: string, defaultContent: object) {
    this.file = file;
    this.defaultContent = defaultContent;
  }

  public async read(): Promise<object> {
    return safeJsonParse(
      await FileStore.readOrCreateFile(
        this.file,
        this.encoding,
        JSON.stringify(this.defaultContent, null, 2)
      )
    );
  }

  public async write(content: object): Promise<object> {
    await fs.writeFile(this.file, JSON.stringify(content, null, 2));
    return this.read();
  }
}

export class ObjectFileStore extends FileStore {
  constructor(file: string, defaultContent: object = {}) {
    super(file, defaultContent);
  }

  public async merge(...args): Promise<object> {
    const current: object = await this.read();
    const merged = merge(...[current].concat(args));
    return this.write(merged);
  }
}

export class ArrayFileStore extends FileStore {
  constructor(file: string, defaultContent: object = []) {
    super(file, defaultContent);
  }

  public async concat(item: object): Promise<object> {
    const current: Array<object> = (await this.read()) as Array<object>;
    return this.write(current.concat(item));
  }

  public async updateBy(
    key: string,
    item: object,
    updateByMerge: boolean = false
  ): Promise<object> {
    const current: Array<object> = (await this.read()) as Array<object>;
    const index: number = current.findIndex(i => i && i[key] === item[key]);
    if (index === -1) {
      return this.concat(item);
    }
    current[index] = updateByMerge
      ? merge(current[index], item)
      : item; /* tslint:disable-line:no-object-mutation */
    return this.write(current);
  }
}
