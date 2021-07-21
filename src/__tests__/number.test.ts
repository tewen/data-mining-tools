import { integersOnly, isIntegerOrIntegerString } from '../';

describe('number', () => {
  describe('isIntegerOrIntegerString()', () => {
    it('should return false for undefined', () => {
      // @ts-ignore
      expect(isIntegerOrIntegerString(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      // @ts-ignore
      expect(isIntegerOrIntegerString(null)).toBe(false);
    });

    it('should return false for a blank string', () => {
      expect(isIntegerOrIntegerString('')).toBe(false);
    });

    it('should return false for a completely non-integer string', () => {
      expect(isIntegerOrIntegerString('Iowa City')).toBe(false);
    });

    it('should return false for a string that has some integers, but not all integers', () => {
      expect(isIntegerOrIntegerString('Fifty 509')).toBe(false);
    });

    it('should return false for a decimal string', () => {
      expect(isIntegerOrIntegerString('10.2')).toBe(false);
    });

    it('should return true for 0', () => {
      expect(isIntegerOrIntegerString('0')).toBe(true);
      expect(isIntegerOrIntegerString(0)).toBe(true);
    });

    it('should return true for all integer strings', () => {
      expect(isIntegerOrIntegerString('101002')).toBe(true);
    });

    it('should return true for integers', () => {
      expect(isIntegerOrIntegerString(99)).toBe(true);
    });
  });

  describe('integersOnly()', () => {
    it('should return a blank string if passed undefined', () => {
      // @ts-ignore
      expect(integersOnly(undefined)).toBe('');
    });

    it('should return a blank string if passed null', () => {
      // @ts-ignore
      expect(integersOnly(null)).toBe('');
    });

    it('should return a blank string if passed a string with no integers', () => {
      expect(integersOnly('Northern Falls')).toBe('');
    });

    it('should parse out non integer characters', () => {
      expect(integersOnly('Fifty 509')).toBe('509');
    });

    it('should parse out non integer characters from a decimal', () => {
      expect(integersOnly(22.8016)).toBe('228016');
    });

    it('should return an integer string if passed an integer string', () => {
      expect(integersOnly('3578')).toBe('3578');
    });

    it('should return an integer string if passed an integer', () => {
      expect(integersOnly(28)).toBe('28');
    });
  });
});
