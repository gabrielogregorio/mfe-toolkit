export declare class StorageService {
    static setItem(key: string, value: string): void;
    static getItem<T = string>(key: string): T | undefined;
    static removeItem(key: string): void;
    static clear(): void;
    static getItemAndParse<T = unknown>(key: string): T | undefined;
}
