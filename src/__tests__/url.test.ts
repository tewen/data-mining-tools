import fs from 'fs-extra';
import path from 'path';
import {
  cleanUrl,
  domainAndSuffixFromUrl,
  isLiveUrl,
  renderDynamicPage,
} from '../';

describe('url', () => {
  describe('domainAndSuffixFromUrl()', () => {
    it('should return a blank string when passed undefined', () => {
      // @ts-ignore
      expect(domainAndSuffixFromUrl(undefined)).toEqual('');
    });

    it('should return a blank string when passed null', () => {
      // @ts-ignore
      expect(domainAndSuffixFromUrl(null)).toEqual('');
    });

    it('should return a blank string when passed a blank string', () => {
      expect(domainAndSuffixFromUrl('')).toEqual('');
    });

    it('should return the domain and suffix when passed an http://www url', () => {
      expect(domainAndSuffixFromUrl('http://www.tunaipsum.com')).toEqual(
        'tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed an https://www url', () => {
      expect(domainAndSuffixFromUrl('https://www.tunaipsum.com')).toEqual(
        'tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed an www url', () => {
      expect(domainAndSuffixFromUrl('www.tunaipsum.com')).toEqual(
        'tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed an http://domain url', () => {
      expect(domainAndSuffixFromUrl('http://tunaipsum.com')).toEqual(
        'tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed a domain and suffix', () => {
      expect(domainAndSuffixFromUrl('tunaipsum.com')).toEqual('tunaipsum.com');
    });

    it('should return the domain and suffix when passed an http:// subdomain and suffix', () => {
      expect(domainAndSuffixFromUrl('http://admin.tunaipsum.com')).toEqual(
        'admin.tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed an https:// subdomain and suffix', () => {
      expect(domainAndSuffixFromUrl('https://admin.tunaipsum.com')).toEqual(
        'admin.tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed an http://wwww subdomain and suffix', () => {
      expect(domainAndSuffixFromUrl('http://www.admin.tunaipsum.com')).toEqual(
        'admin.tunaipsum.com'
      );
    });

    it('should return the domain and suffix when passed a subdomain and suffix', () => {
      expect(domainAndSuffixFromUrl('admin.tunaipsum.com')).toEqual(
        'admin.tunaipsum.com'
      );
    });
  });

  describe('cleanUrl()', () => {
    it('should return undefined when passed undefined', () => {
      // @ts-ignore
      expect(cleanUrl(undefined)).toEqual(undefined);
    });

    it('should return undefined when passed null', () => {
      // @ts-ignore
      expect(cleanUrl(null)).toEqual(undefined);
    });

    it('should return undefined when passed blank', () => {
      expect(cleanUrl('')).toEqual(undefined);
    });

    it('should return undefined when passed an invalid url string', () => {
      expect(cleanUrl('invalid url')).toEqual(undefined);
    });

    it('should return undefined when passed an invalid url string with extra spaces', () => {
      expect(cleanUrl(' hey friend ')).toEqual(undefined);
      expect(cleanUrl('http:// hey friend')).toEqual(undefined);
    });

    it('should return a url with http when passed one without http', () => {
      expect(cleanUrl('motorhead.org')).toEqual('http://motorhead.org');
    });

    it('should return a url with http when passed one with http', () => {
      expect(cleanUrl('http://koolaid.net')).toEqual('http://koolaid.net');
    });

    it('should return a url with https when passed one with https', () => {
      expect(cleanUrl('https://chase.com')).toEqual('https://chase.com');
    });

    it('plays nice with subdomains', () => {
      expect(cleanUrl('https://money.chase.com')).toEqual(
        'https://money.chase.com'
      );
    });

    it('plays nice with www', () => {
      expect(cleanUrl('www.skittles.com')).toEqual('http://www.skittles.com');
    });

    it('plays nice with end slashes', () => {
      expect(cleanUrl('www.skittles.com/')).toEqual('http://www.skittles.com/');
    });

    it('plays nice with paths', () => {
      expect(cleanUrl('www.skittles.com/path/to/place-there')).toEqual(
        'http://www.skittles.com/path/to/place-there'
      );
    });

    it('plays nice with extensions', () => {
      expect(cleanUrl('https://money.chase.com/agreement.txt')).toEqual(
        'https://money.chase.com/agreement.txt'
      );
      expect(cleanUrl('chase.com/agreement.txt')).toEqual(
        'http://chase.com/agreement.txt'
      );
    });

    it('plays nice with queries', () => {
      expect(
        cleanUrl(
          'https://money.chase.com/agreement.txt?success=true&failure=never'
        )
      ).toEqual(
        'https://money.chase.com/agreement.txt?success=true&failure=never'
      );
      expect(cleanUrl('chase.com?success=true&failure=never')).toEqual(
        'http://chase.com?success=true&failure=never'
      );
    });
  });

  describe.skip('isLiveUrl()', () => {
    it('should return false when passed undefined', async () => {
      // @ts-ignore
      expect(await isLiveUrl(undefined)).toBe(false);
    });

    it('should return false when passed null', async () => {
      // @ts-ignore
      expect(await isLiveUrl(null)).toBe(false);
    });

    it('should return false when passed an empty string', async () => {
      expect(await isLiveUrl('')).toBe(false);
    });

    it('should return false when passed a string with spaces only', async () => {
      expect(await isLiveUrl('    ')).toBe(false);
    });

    it('should return false when passed an invalid url', async () => {
      expect(await isLiveUrl('not a real url.org')).toBe(false);
    });

    it('should return false when passed an invalid url string with extra spaces', async () => {
      expect(await isLiveUrl('  not a real url.org  ')).toBe(false);
    });

    const temporarilyIgnoredUrls = ['http://mixliquid.com/'];

    const testUrlSet: Function = async (
      urls: string[],
      expectation: boolean,
      options: object = {}
    ) => {
      const first = urls[0];
      if (first) {
        if (temporarilyIgnoredUrls.indexOf(first) === -1) {
          const received = await isLiveUrl(first, options);
          if (received !== expectation) {
            const directorypath: string = 'tmp/test/url';
            const filepath: string = path.join(
              directorypath,
              `${domainAndSuffixFromUrl(first).split('.')[0]}.html`
            );
            await fs.mkdirp(directorypath);
            const rendered: string = await renderDynamicPage(first);
            await fs.writeFile(filepath, rendered);
            throw new Error(
              `${first} did not return the expectation ${expectation}. Wrote html to ${filepath}.`
            );
          }
        }
        return testUrlSet(urls.slice(1), expectation, options);
      }
    };

    // VALID URLS
    const validUrls = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'fixtures/validUrls.json'), 'utf8')
    );

    // TODO - Something failed here during the migration.
    it('should return true for the valid url set', async () => {
      jest.setTimeout(15000);
      await testUrlSet(validUrls, true);
    });

    // INVALID URLS
    const invalidUrls = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'fixtures/invalidUrls.json'), 'utf8')
    );

    it('should return false for the invalid url set', async () => {
      jest.setTimeout(15000);
      await testUrlSet(invalidUrls, false);
    });

    // STATIC ERROR PAGE
    const staticErrorPageUrls = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'fixtures/staticErrorPageUrls.json'),
        'utf8'
      )
    );

    it('should return false for the static error page url set', async () => {
      await testUrlSet(staticErrorPageUrls, false);
    });

    // PARKING PAGE
    const parkingPageUrls = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'fixtures/parkingPageUrls.json'),
        'utf8'
      )
    );

    // NOTE - This test is still failing for some issues related to fakeUrl.com connection
    it('should return false for the parking page url set', async () => {
      await testUrlSet(parkingPageUrls, false);
    });

    it('should return true for parking pages if the check is skipped in the options', async () => {
      await testUrlSet(parkingPageUrls, true, { parkingPageCheck: false });
    });
  });
});
