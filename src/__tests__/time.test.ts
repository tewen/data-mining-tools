import { randomTimeout, timeout } from '../';

describe('time', () => {
  describe('timeout()', () => {
    it('should resolve in the amount of time required for the count', async () => {
      expect(await timeout(10)).toBeUndefined();
    });
  });

  describe('randomTimeout()', () => {
    it('should default the minimum to 1000 and the maximum to 10000', async () => {
      jest.setTimeout(15000);
      expect(await randomTimeout()).toBeUndefined();
    });

    it('should resolve in a range between the min and max count', async () => {
      expect(await randomTimeout(1, 9)).toBeUndefined();
    });
  });
});
