export function cleanFilename(
  filename: string,
  slashReplacement: string = '_'
): string {
  return (filename || '').replace(/(\/|\\)/gi, slashReplacement).trim();
}
