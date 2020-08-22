/* tslint:disable:no-expression-statement */
import { expect } from 'chai';
import { cleanUrl, domainAndSuffixFromUrl } from './url';

// domainAndSuffixFromUrl
describe('url', () => {
  describe('domainAndSuffixFromUrl()', () => {
    it('should return a blank string when passed undefined', () => {
      expect(domainAndSuffixFromUrl(undefined)).to.equal('');
    });

    it('should return a blank string when passed null', () => {
      expect(domainAndSuffixFromUrl(null)).to.equal('');
    });

    it('should return a blank string when passed a blank string', () => {
      expect(domainAndSuffixFromUrl('')).to.equal('');
    });

    it('should return the domain and suffix when passed an http://www url', () => {
      expect(domainAndSuffixFromUrl('http://www.tunaipsum.com')).to.equal(
        'tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed an https://www url', () => {
      expect(domainAndSuffixFromUrl('https://www.tunaipsum.com')).to.equal(
        'tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed an www url', () => {
      expect(domainAndSuffixFromUrl('www.tunaipsum.com')).to.equal(
        'tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed an http://domain url', () => {
      expect(domainAndSuffixFromUrl('http://tunaipsum.com')).to.equal(
        'tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed a domain and suffix', () => {
      expect(domainAndSuffixFromUrl('tunaipsum.com')).to.equal('tunaipsum.com');
    });

    it('should return the domain and suffix when passed an http:// subdomain and suffix', () => {
      expect(domainAndSuffixFromUrl('http://admin.tunaipsum.com')).to.equal(
        'admin.tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed an https:// subdomain and suffix', () => {
      expect(domainAndSuffixFromUrl('https://admin.tunaipsum.com')).to.equal(
        'admin.tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed an http://wwww subdomain and suffix', () => {
      expect(domainAndSuffixFromUrl('http://www.admin.tunaipsum.com')).to.equal(
        'admin.tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed a subdomain and suffix', () => {
      expect(domainAndSuffixFromUrl('admin.tunaipsum.com')).to.equal(
        'admin.tunaipsum.com'
      );
    });
  });

  describe('cleanUrl()', () => {
    it('should return undefined when passed undefined', () => {
      expect(cleanUrl(undefined)).to.equal(undefined);
    });

    it('should return undefined when passed null', () => {
      expect(cleanUrl(null)).to.equal(undefined);
    });

    it('should return undefined when passed blank', () => {
      expect(cleanUrl('')).to.equal(undefined);
    });

    it('should return undefined when passed an invalid url string', () => {
      expect(cleanUrl('invalid url')).to.equal(undefined);
    });

    it('should return undefined when passed an invalid url string with extra spaces', () => {
      expect(cleanUrl(' hey friend ')).to.equal(undefined);
      expect(cleanUrl('http:// hey friend')).to.equal(undefined);
    });

    it('should return a url with http when passed one without http', () => {
      expect(cleanUrl('motorhead.org')).to.equal('http://motorhead.org');
    });

    it('should return a url with http when passed one with http', () => {
      expect(cleanUrl('http://koolaid.net')).to.equal('http://koolaid.net');
    });

    it('should return a url with https when passed one with https', () => {
      expect(cleanUrl('https://chase.com')).to.equal('https://chase.com');
    });

    it('plays nice with subdomains', () => {
      expect(cleanUrl('https://money.chase.com')).to.equal(
        'https://money.chase.com'
      );
    });

    it('plays nice with www', () => {
      expect(cleanUrl('www.skittles.com')).to.equal('http://www.skittles.com');
    });

    it('plays nice with end slashes', () => {
      expect(cleanUrl('www.skittles.com/')).to.equal(
        'http://www.skittles.com/'
      );
    });

    it('plays nice with paths', () => {
      expect(cleanUrl('www.skittles.com/path/to/place-there')).to.equal(
        'http://www.skittles.com/path/to/place-there'
      );
    });

    it('plays nice with extensions', () => {
      expect(cleanUrl('https://money.chase.com/agreement.txt')).to.equal(
        'https://money.chase.com/agreement.txt'
      );
      expect(cleanUrl('chase.com/agreement.txt')).to.equal(
        'http://chase.com/agreement.txt'
      );
    });

    it('plays nice with queries', () => {
      expect(
        cleanUrl(
          'https://money.chase.com/agreement.txt?success=true&failure=never'
        )
      ).to.equal(
        'https://money.chase.com/agreement.txt?success=true&failure=never'
      );
      expect(cleanUrl('chase.com?success=true&failure=never')).to.equal(
        'http://chase.com?success=true&failure=never'
      );
    });
  });
});
