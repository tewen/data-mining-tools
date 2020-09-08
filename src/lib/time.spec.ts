/* tslint:disable:no-expression-statement no-unused-expression typedef */
import { expect } from 'chai';
import { randomTimeout, timeout } from './time';

describe('time', () => {
  describe('timeout()', () => {
    it('should resolve in the amount of time required for the count', async () => {
      expect(await timeout(10)).to.be.undefined;
    });
  });

  describe('randomTimeout()', () => {
    it('should default the minimum to 1000 and the maximum to 10000', async () => {
      expect(await randomTimeout()).to.be.undefined;
    });

    it('should resolve in a range between the min and max count', async () => {
      expect(await randomTimeout(1, 9)).to.be.undefined;
    });
  });
});
