import { URL } from 'url';

export function domainAndSuffixFromUrl(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./i, '');
  } catch (e) {
    // Invalid URLS are just strings
    return typeof url === 'string' ? url.replace(/^www\./i, '') : '';
  }
}

export function cleanUrl(url: string): string {
  try {
    if (url && typeof url === 'string') {
      const prefixed: string = (/^(http|https):\/\//i.test(url)
        ? url
        : `http://${url}`
      ).trim();
      const { hostname } = new URL(prefixed);
      if (hostname) {
        return prefixed;
      }
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
}
