/* tslint:disable:array-type readonly-array */
import axios, { CancelTokenSource } from 'axios';
import cheerio from 'cheerio';
import { escapeForRegExp, tryCatch } from 'deep-cuts';
import { URL } from 'url';
import { renderDynamicPage } from './render';

const isSuccess = (status: number): boolean => status < 400;

function isStaticErrorPage(html:string):boolean {
  const $ = cheerio.load(html);
  const title:string = $('title').text();
  return /not\sfound/i.test(title) || /internal\sserver\serror/i.test(title);
}

async function isParkingPage(url: string): Promise<boolean> {
  /* tslint:disable:no-console */
  console.warn(
    'Please note, checking for parking pages is still being tested. This is a beta release.'
  );
  /* tslint:enable:no-console */
  const domainAndSuffix: string = escapeForRegExp(domainAndSuffixFromUrl(url));
  const rendered: string = await renderDynamicPage(url);
  const tests: Array<RegExp> = [
    /godaddy/gi,
    /domain\savailable/gi,
    /parked\sdomain/gi,
    new RegExp(`${domainAndSuffix} is for sale`, 'ig'),
    new RegExp(`${domainAndSuffix} is available for sale`, 'ig')
  ];
  const passing: number = tests.reduce(
    (count: number, expression: RegExp) =>
      expression.test(rendered) ? count + 1 : count,
    0
  );

  // NOTE - We will need to tweak this as the process becomes more sophisticated.
  return passing >= 1;
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

export function cleanUrl(url: string): string {
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
  { timeout = 10000, parkingPageCheck = true } = {}
): Promise<boolean> {
  const cleaned: string = cleanUrl(url);
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
      return (
        isSuccess(status) && !isStaticErrorPage(data) &&
        (!parkingPageCheck || !(await isParkingPage(cleaned)))
      );
    }
  }
  return false;
}
