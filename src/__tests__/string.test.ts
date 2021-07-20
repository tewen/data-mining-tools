import { cleanFilename } from '../';

describe('string', () => {
  describe('cleanFilename()', () => {
    it('should return a blank string when passed undefined', () => {
      // @ts-ignore
      expect(cleanFilename(undefined)).toEqual('');
    });

    it('should return a blank string when passed null', () => {
      // @ts-ignore
      expect(cleanFilename(null)).toEqual('');
    });

    it('should return a blank string when passed a blank string', () => {
      expect(cleanFilename('')).toEqual('');
    });

    it('should return a string with no spaces if passed an empty string with spaces', () => {
      expect(cleanFilename('   ')).toEqual('');
    });

    it('should trim down a value', () => {
      expect(cleanFilename(' not trim.jpg ')).toEqual('not trim.jpg');
    });

    it('should replace all forward slashes with the underscore by default', () => {
      expect(cleanFilename('multipart/file/name.gif')).toEqual(
        'multipart_file_name.gif'
      );
    });

    it('should replace all backward slashes with the underscore by default', () => {
      expect(cleanFilename('multipart\\file\\name.txt')).toEqual(
        'multipart_file_name.txt'
      );
    });

    it('should be able to specify a replacement character', () => {
      expect(cleanFilename('multipart\\file\\name.txt', '-')).toEqual(
        'multipart-file-name.txt'
      );
    });

    it('should play nice with 0 as an integer', () => {
      // @ts-ignore
      expect(cleanFilename(0)).toEqual('0');
    });

    it('should play nice with a positive integer', () => {
      // @ts-ignore
      expect(cleanFilename(15)).toEqual('15');
    });

    it('should play nice with a float', () => {
      // @ts-ignore
      expect(cleanFilename(99.27)).toEqual('99.27');
    });

    it('should play nice with boolean true', () => {
      // @ts-ignore
      expect(cleanFilename(true)).toEqual('true');
    });

    it('should play nice with boolean false', () => {
      // @ts-ignore
      expect(cleanFilename(false)).toEqual('false');
    });

    it('should play nice with a date', () => {
      const now: Date = new Date();
      const nowString: string = now.toLocaleString().replace(/(\/|\\)/gi, '_');
      // @ts-ignore
      expect(cleanFilename(now)).toEqual(nowString);
    });
  });
});
