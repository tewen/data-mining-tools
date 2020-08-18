// tslint:disable:no-expression-statement
import test from 'ava';
import { domainAndSuffixFromUrl } from './url';

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
