export abstract class CookieService {
  constructor() {}

  static get<T = string>(name: string): T {
    const cookies = document.cookie;

    const startIndex = CookieService.getStartIndex(cookies, name);
    const lastIndex = CookieService.getLastIndex(cookies, startIndex);

    const value = decodeURIComponent(cookies.slice(startIndex, lastIndex));

    return value as T;
  }

  static set(name: string, value: string | number): void {
    document.cookie += `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )};`;
  }

  static remove(name: string): void {
    const cookies = document.cookie;
    const value = CookieService.get(name);
    const searchParam = new RegExp(
      `${encodeURIComponent(name)}=${encodeURIComponent(value)}(;)?`,
      'ig'
    );
    document.cookie = cookies.replace(searchParam, '');
  }

  private static getStartIndex(cookies: string, searchParam: string): number {
    const startIndex = cookies.indexOf(`${encodeURIComponent(searchParam)}=`);

    if (startIndex === -1) {
      throw new Error('');
    }

    return startIndex;
  }

  private static getLastIndex(cookies: string, startIndex: number): number {
    let lastIndex: number = cookies.indexOf(';', startIndex);
    return lastIndex === -1 ? cookies.length : lastIndex;
  }
}
