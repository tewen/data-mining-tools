// tslint:disable:no-expression-statement
import test from 'ava';
import { cleanUrl, domainAndSuffixFromUrl } from './url';

// domainAndSuffixFromUrl
test('returns a blank string when passed undefined', t => {
  t.is(domainAndSuffixFromUrl(undefined), '');
});

test('returns a blank string when passed null', t => {
  t.is(domainAndSuffixFromUrl(null), '');
});

test('returns a blank string when passed a blank string', t => {
  t.is(domainAndSuffixFromUrl(''), '');
});

test('returns the domain and suffix when passed an http://www url', t => {
  t.is(domainAndSuffixFromUrl('http://www.tunaipsum.com'), 'tunaipsum.com');
});

test('returns the domain and suffix when passed an https://www url', t => {
  t.is(domainAndSuffixFromUrl('https://www.tunaipsum.com'), 'tunaipsum.com');
});

test('returns the domain and suffix when passed an www url', t => {
  t.is(domainAndSuffixFromUrl('www.tunaipsum.com'), 'tunaipsum.com');
});

test('returns the domain and suffix when passed an http://domain url', t => {
  t.is(domainAndSuffixFromUrl('http://tunaipsum.com'), 'tunaipsum.com');
});

test('returns the domain and suffix when passed a domain and suffix', t => {
  t.is(domainAndSuffixFromUrl('tunaipsum.com'), 'tunaipsum.com');
});

test('returns the domain and suffix when passed an http:// subdomain and suffix', t => {
  t.is(
    domainAndSuffixFromUrl('http://admin.tunaipsum.com'),
    'admin.tunaipsum.com'
  );
});

test('returns the domain and suffix when passed an https:// subdomain and suffix', t => {
  t.is(
    domainAndSuffixFromUrl('https://admin.tunaipsum.com'),
    'admin.tunaipsum.com'
  );
});

test('returns the domain and suffix when passed an http://wwww subdomain and suffix', t => {
  t.is(
    domainAndSuffixFromUrl('http://www.admin.tunaipsum.com'),
    'admin.tunaipsum.com'
  );
});

test('returns the domain and suffix when passed a subdomain and suffix', t => {
  t.is(domainAndSuffixFromUrl('admin.tunaipsum.com'), 'admin.tunaipsum.com');
});

// cleanUrl
test('returns undefined when passed undefined', t => {
  t.is(cleanUrl(undefined), undefined);
});

test('returns undefined when passed null', t => {
  t.is(cleanUrl(null), undefined);
});

test('returns undefined when passed blank', t => {
  t.is(cleanUrl(''), undefined);
});

test('returns undefined when passed an invalid url string', t => {
  t.is(cleanUrl('invalid url'), undefined);
});

test('returns a url with http when passed one without http', t => {
  t.is(cleanUrl('motorhead.org'), 'http://motorhead.org');
});

test('returns a url with http when passed one with http', t => {
  t.is(cleanUrl('http://koolaid.net'), 'http://koolaid.net');
});

test('returns a url with https when passed one with https', t => {
  t.is(cleanUrl('https://chase.com'), 'https://chase.com');
});

test('plays nice with subdomains', t => {
  t.is(cleanUrl('https://money.chase.com'), 'https://money.chase.com');
});

test('plays nice with www', t => {
  t.is(cleanUrl('www.skittles.com'), 'http://www.skittles.com');
});

test('plays nice with end slashes', t => {
  t.is(cleanUrl('www.skittles.com/'), 'http://www.skittles.com/');
});

test('plays nice with paths', t => {
  t.is(
    cleanUrl('www.skittles.com/path/to/place-there'),
    'http://www.skittles.com/path/to/place-there'
  );
});

test('plays nice with extensions', t => {
  t.is(
    cleanUrl('https://money.chase.com/agreement.txt'),
    'https://money.chase.com/agreement.txt'
  );
  t.is(cleanUrl('chase.com/agreement.txt'), 'http://chase.com/agreement.txt');
});

test('plays nice with queries', t => {
  t.is(
    cleanUrl(
      'https://money.chase.com/agreement.txt?success=true&failure=never'
    ),
    'https://money.chase.com/agreement.txt?success=true&failure=never'
  );
  t.is(
    cleanUrl('chase.com?success=true&failure=never'),
    'http://chase.com?success=true&failure=never'
  );
});
