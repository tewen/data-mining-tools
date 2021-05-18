/* tslint:disable:no-expression-statement no-unused-expression */
import { expect } from 'chai';
import { cleanFilename } from './string';

describe('string', () => {
  describe('cleanFilename()', () => {
    it('should return a blank string when passed undefined', () => {
      expect(cleanFilename(undefined)).to.eql('');
    });

    it('should return a blank string when passed null', () => {
      expect(cleanFilename(null)).to.eql('');
    });

    it('should return a blank string when passed a blank string', () => {
      expect(cleanFilename('')).to.eql('');
    });

    it('should return a string with no spaces if passed an empty string with spaces', () => {
      expect(cleanFilename('   ')).to.eql('');
    });

    it('should trim down a value', () => {
      expect(cleanFilename(' not trim.jpg ')).to.eql('not trim.jpg');
    });

    it('should replace all forward slashes with the underscore by default', () => {
      expect(cleanFilename('multipart/file/name.gif')).to.eql(
        'multipart_file_name.gif'
      );
    });

    it('should replace all backward slashes with the underscore by default', () => {
      expect(cleanFilename('multipart\\file\\name.txt')).to.eql(
        'multipart_file_name.txt'
      );
    });

    it('should be able to specify a replacement character', () => {
      expect(cleanFilename('multipart\\file\\name.txt', '-')).to.eql(
        'multipart-file-name.txt'
      );
    });

    it('should play nice with 0 as an integer', () => {
      // @ts-ignore
      expect(cleanFilename(0)).to.eql('0');
    });

    it('should play nice with a positive integer', () => {
      // @ts-ignore
      expect(cleanFilename(15)).to.eql('15');
    });

    it('should play nice with a float', () => {
      // @ts-ignore
      expect(cleanFilename(99.27)).to.eql('99.27');
    });

    it('should play nice with boolean true', () => {
      // @ts-ignore
      expect(cleanFilename(true)).to.eql('true');
    });

    it('should play nice with boolean false', () => {
      // @ts-ignore
      expect(cleanFilename(false)).to.eql('false');
    });

    it('should play nice with a date', () => {
      const now: Date = new Date();
      const nowString: string = now.toLocaleString().replace(/(\/|\\)/gi, '_');
      // @ts-ignore
      expect(cleanFilename(now)).to.eql(nowString);
    });
  });
});
