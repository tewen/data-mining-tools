import axios, { CancelTokenSource } from 'axios';
import cheerio from 'cheerio';
import { tryCatch } from 'deep-cuts';
import { URL } from 'url';

const isSuccess = (status: number): boolean => status < 400;

function isStaticErrorPage(html: string): boolean {
  const $ = cheerio.load(html);
  const title: string = $('title').text();
  return /not\sfound/i.test(title) || /internal\sserver\serror/i.test(title);
}

export function domainAndSuffixFromUrl(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./i, '');
  } catch (e) {
    // Invalid URLS are just strings
    return typeof url === 'string' ? url.replace(/^www\./i, '') : '';
  }
}

export function cleanUrl(url: string): string | undefined {
  try {
    if (url && typeof url === 'string') {
      const prefixed: string = (/^(http|https):\/\//i.test(url)
        ? url
        : `http://${url}`
      ).trim();
      const { hostname } = new URL(prefixed);
      /* istanbul ignore else */
      if (hostname) {
        return prefixed;
      }
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
}

export async function isLiveUrl(
  url: string,
  { timeout = 10000 } = {}
): Promise<boolean> {
  const cleaned: string | undefined = cleanUrl(url);
  if (cleaned) {
    const requestCancelToken: CancelTokenSource = axios.CancelToken.source();
    setTimeout(
      () => requestCancelToken.cancel(),
      timeout
    ); /* tslint:disable-line:no-expression-statement */
    const { response, error } = await tryCatch(() =>
      axios.get(cleaned, { cancelToken: requestCancelToken.token })
    );
    if (!error && response) {
      const { status, data } = response;
      return isSuccess(status) && !isStaticErrorPage(data);
    }
  }
  return false;
}
