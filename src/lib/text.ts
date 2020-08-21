export function cleanText(text: string): string {
  if (typeof text === 'string') {
    return text.trim().replace(/\n|\r/gi, '');
  }
  return undefined;
}
