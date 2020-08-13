// tslint:disable:no-expression-statement
import test from 'ava';
import { timeout } from './time';

test('resolves in the time of the count', async t => {
  t.is(await timeout(10), undefined);
});
