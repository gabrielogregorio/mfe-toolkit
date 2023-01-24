export class StorageService {
  public static setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public static getItem<T = string>(key: string): T | undefined {
    return (localStorage.getItem(key) as T) || undefined;
  }

  public static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public static clear(): void {
    localStorage.clear();
  }

  public static getItemAndParse<T = unknown>(key: string): T | undefined {
    try {
      const item: string | undefined = localStorage.getItem(key) || undefined;

      if (item === undefined) {
        return undefined;
      }
      return JSON.parse(item) as T;
    } catch (error: unknown) {
      return undefined;
    }
  }
}
