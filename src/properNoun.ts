import { parseFullName } from 'parse-full-name';
import { cleanDiacritics } from './text';

export interface IName {
  title: string;
  first: string;
  middle: string;
  last: string;
  nick: string;
  suffix: string;
  error: string[];
}

export function fullName(name: string): IName {
  return parseFullName((name || '').trim());
}

export function emailReadyFullName(name: string): IName {
  return fullName(cleanDiacritics((name || '').trim()));
}
