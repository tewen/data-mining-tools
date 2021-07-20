import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin()); // tslint:disable-line:no-expression-statement

export const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36';

export async function renderDynamicPage(
  url: string,
  userAgent: string = DEFAULT_USER_AGENT
): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    // slows down Puppeteer operations
    slowMo: 100,
  });
  const browserPage = await browser.newPage();
  await browserPage.setUserAgent(userAgent);
  const response = await browserPage.goto(url);
  // @ts-ignore
  const html = await response.text();
  await browser.close();
  return html;
}
