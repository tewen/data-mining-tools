export function cleanText(text: string): string | undefined {
  if (typeof text === 'string') {
    return text.trim().replace(/\n|\r/gi, '');
  }
  return undefined;
}
