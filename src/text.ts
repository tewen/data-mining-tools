import cheerio from 'cheerio';
import diacritic from 'diacritic';

export function cleanText(text: string): string | undefined {
  if (typeof text === 'string') {
    return text.trim().replace(/\n|\r/gi, '');
  }
  return undefined;
}

export function cleanDiacritics(text: string): string {
  const $ = cheerio.load(`<textarea>${text || ''}</textarea>`);
  return diacritic.clean($('textarea').text());
}

export function cleanGaps(text: string): string {
  return (text || '').trim().replace(/\s\s+/g, ' ');
}
