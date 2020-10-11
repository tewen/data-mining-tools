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
  });
});
