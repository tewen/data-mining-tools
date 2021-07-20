import { cleanText } from '../';

describe('text', () => {
  describe('cleanText()', () => {
    it('returns undefined if passed undefined', () => {
      // @ts-ignore
      expect(cleanText(undefined)).toEqual(undefined);
    });

    it('returns undefined when passed null', () => {
      // @ts-ignore
      expect(cleanText(null)).toEqual(undefined);
    });

    it('returns a blank string if passed a blank string', () => {
      expect(cleanText('')).toEqual('');
    });

    it('trims an empty string', () => {
      expect(cleanText('   ')).toEqual('');
    });

    it('trims a string', () => {
      expect(cleanText(' My string. ')).toEqual('My string.');
    });

    it('removes newlines', () => {
      expect(cleanText('Red \nGreen \rBlue \n')).toEqual('Red Green Blue');
    });
  });
});
