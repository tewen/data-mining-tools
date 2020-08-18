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
