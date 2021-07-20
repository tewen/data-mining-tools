export function cleanFilename(
  filename: string | number | Date,
  slashReplacement: string = '_'
): string {
  return (() => {
    if (filename === undefined || filename === null || Number.isNaN(filename)) {
      return '';
    } else if (filename instanceof Date) {
      return filename.toLocaleString();
    } else {
      return String(filename);
    }
  })()
    .replace(/(\/|\\)/gi, slashReplacement)
    .trim();
}
