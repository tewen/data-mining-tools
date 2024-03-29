import { cleanText, cleanDiacritics, cleanGaps } from '../';

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

  describe('cleanDiacritics', () => {
    it('should return an empty string when passed undefined', () => {
      // @ts-ignore
      expect(cleanDiacritics(undefined)).toBe('');
    });

    it('should return an empty string when passed null', () => {
      // @ts-ignore
      expect(cleanDiacritics(null)).toBe('');
    });

    it('should return an empty string when passed an empty string', () => {
      // @ts-ignore
      expect(cleanDiacritics('')).toBe('');
    });

    it('should return a non diacritic string unmodified', () => {
      expect(cleanDiacritics(' Canton Springs ')).toBe(' Canton Springs ');
    });

    it('should play nice with html encoded diacritics', () => {
      expect(cleanDiacritics('Luk&#225;&#353; Konarovsk&#253;')).toBe(
        'Lukas Konarovsky'
      );
    });

    it('should should play nice with utf8 diacritics', () => {
      expect(cleanDiacritics('Lukáš BÜttne')).toBe('Lukas BUttne');
    });
  });

  describe('cleanGaps()', () => {
    it('should return an empty string when passed undefined', () => {
      // @ts-ignore
      expect(cleanGaps(undefined)).toBe('');
    });

    it('should return an empty string when passed null', () => {
      // @ts-ignore
      expect(cleanGaps(null)).toBe('');
    });

    it('should return an empty string when passed an empty string', () => {
      expect(cleanGaps('')).toBe('');
    });

    it('should return a string with single spaces as-is if passed one', () => {
      expect(cleanGaps('The quick brown fox')).toBe('The quick brown fox');
    });

    it('should trim the edges of the string', () => {
      expect(cleanGaps(' The quick brown fox  ')).toBe('The quick brown fox');
    });

    it('should make any multi-space blocks single', () => {
      expect(cleanGaps('The   quick      brown  fox ')).toBe(
        'The quick brown fox'
      );
    });

    it('should be able to clean newlines', () => {
      expect(cleanGaps('The quick \n brown fox')).toBe('The quick brown fox');
    });
  });
});
