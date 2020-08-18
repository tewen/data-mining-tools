// tslint:disable:no-expression-statement
import test from 'ava';
import { randomTimeout, timeout } from './time';

// timeout
test('resolves in the time of the count', async t => {
  t.is(await timeout(10), undefined);
});

// randomTimeout
test('resolves in a range between the min and max count', async t => {
  t.is(await randomTimeout(1, 9), undefined);
});
