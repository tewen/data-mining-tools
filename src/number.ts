export function isIntegerOrIntegerString(value: string | number): boolean {
  return (
    value !== null && value !== undefined && /^[-+]?\d+$/gi.test(String(value))
  );
}

export function integersOnly(value: string | number): string {
  if (value !== null && value !== undefined) {
    return String(value)
      .replace(/\D/g, '')
      .trim();
  } else {
    return '';
  }
}
