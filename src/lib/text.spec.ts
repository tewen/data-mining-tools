// tslint:disable:no-expression-statement
import { expect } from 'chai';
import { cleanText } from './text';

describe('text', () => {
  describe('cleanText()', () => {
    it('returns undefined if passed undefined', () => {
      expect(cleanText(undefined)).to.equal(undefined);
    });

    it('returns undefined when passed null', () => {
      expect(cleanText(null)).to.equal(undefined);
    });

    it('returns a blank string if passed a blank string', () => {
      expect(cleanText('')).to.equal('');
    });

    it('trims an empty string', () => {
      expect(cleanText('   ')).to.equal('');
    });

    it('trims a string', () => {
      expect(cleanText(' My string. ')).to.equal('My string.');
    });

    it('removes newlines', () => {
      expect(cleanText('Red \nGreen \rBlue \n')).to.equal('Red Green Blue');
    });
  });
});
