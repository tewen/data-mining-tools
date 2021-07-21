import { emailReadyFullName, fullName, IName } from '../';

describe('properNoun', () => {
  const getEmptyName = (): IName => ({
    title: '',
    first: '',
    middle: '',
    last: '',
    nick: '',
    suffix: '',
    error: [],
  });

  describe('fullName()', () => {
    it('should return empty name parts when passed undefined', () => {
      // @ts-ignore
      expect(fullName(undefined)).toEqual({
        ...getEmptyName(),
        error: ['Error: No input'],
      });
    });

    it('should return empty name parts when passed null', () => {
      // @ts-ignore
      expect(fullName(null)).toEqual({
        ...getEmptyName(),
        error: ['Error: No input'],
      });
    });

    it('should return empty name parts when passed a blank string', () => {
      // @ts-ignore
      expect(fullName('')).toEqual({
        ...getEmptyName(),
        error: ['Error: No input'],
      });
    });

    it('should be able to pull out first and last name', () => {
      expect(fullName('Calvin Coolidge')).toEqual({
        ...getEmptyName(),
        first: 'Calvin',
        last: 'Coolidge',
      });
    });

    it('should be able to pull out middle names', () => {
      expect(fullName('Calvin Grandmaster-Funk Coolidge')).toEqual({
        ...getEmptyName(),
        first: 'Calvin',
        last: 'Coolidge',
        middle: 'Grandmaster-Funk',
      });
    });

    it('should be able to pull out titles', () => {
      expect(fullName('Dr. Calvin Grandmaster-Funk Coolidge')).toEqual({
        ...getEmptyName(),
        first: 'Calvin',
        last: 'Coolidge',
        middle: 'Grandmaster-Funk',
        title: 'Dr.',
      });
    });

    it('should be able to pull out suffixes', () => {
      expect(fullName('Dr. Calvin Grandmaster-Funk Coolidge III')).toEqual({
        ...getEmptyName(),
        first: 'Calvin',
        last: 'Coolidge',
        middle: 'Grandmaster-Funk',
        title: 'Dr.',
        suffix: 'III',
      });
    });
  });

  describe('emailReadyFullName()', () => {
    it('should have the same return as fullName() for a normal name', () => {
      expect(
        emailReadyFullName('Dr. Calvin Grandmaster-Funk Coolidge III')
      ).toEqual({
        ...getEmptyName(),
        first: 'Calvin',
        last: 'Coolidge',
        middle: 'Grandmaster-Funk',
        title: 'Dr.',
        suffix: 'III',
      });
    });

    it('should clean out html diacritics', () => {});

    it('should clean out utf8 diacritics', () => {});
  });
});
