// tslint:disable:no-expression-statement
import test from 'ava';
import { cleanText } from './text';

// cleanText
test('returns undefined if passed undefined', t => {
  t.is(cleanText(undefined), undefined);
});

test('returns undefined when passed null', t => {
  t.is(cleanText(null), undefined);
});

test('returns a blank string if passed a blank string', t => {
  t.is(cleanText(''), '');
});

test('trims an empty string', t => {
  t.is(cleanText('   '), '');
});

test('trims a string', t => {
  t.is(cleanText(' My string. '), 'My string.');
});

test('removes newlines', t => {
  t.is(cleanText('Red \nGreen \rBlue \n'), 'Red Green Blue');
});
