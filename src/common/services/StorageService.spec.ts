import { StorageService } from '@/services/StorageService';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get a empty key', () => {
    const anyKey: string = 'abc123';
    expect(StorageService.getItem(anyKey)).toEqual(undefined);
  });

  it('should get value defined in localStorage', () => {
    const validKey: string = 'abc123';
    localStorage.setItem(validKey, '123');

    expect(StorageService.getItem(validKey)).toEqual('123');
  });

  it('should setItem in localStorage', () => {
    StorageService.setItem('myKey', 'abc-mock');
    expect(localStorage.getItem('myKey')).toEqual('abc-mock');
  });

  it('should get item and parse from localStorage', () => {
    const dataMock: {
      name: string;
      id: number;
    }[] = [
      {
        name: 'mock-test',
        id: 8,
      },
    ];
    StorageService.setItem('myKey2', JSON.stringify(dataMock));
    expect(StorageService.getItemAndParse('myKey2')).toEqual(dataMock);
  });

  it('should get item and parse from localStorage, but invalid parser', () => {
    StorageService.setItem('myKey2', '{ "invalidKey": "abc", invalid}');
    expect(StorageService.getItemAndParse('myKey2')).toEqual(undefined);
  });

  it('should try get and parse invalid key', () => {
    expect(StorageService.getItemAndParse('myKeyInvalid')).toEqual(undefined);
  });

  it('should remove item from localStorage', () => {
    localStorage.setItem('key-mock-1', 'abc1');
    localStorage.setItem('key-mock-2', 'abc2');

    expect(StorageService.getItem('key-mock-1')).toEqual('abc1');
    expect(StorageService.getItem('key-mock-2')).toEqual('abc2');
    StorageService.removeItem('key-mock-1');
    expect(StorageService.getItem('key-mock-1')).toEqual(undefined);
    expect(StorageService.getItem('key-mock-2')).toEqual('abc2');
  });

  it('should clear all localStorage', () => {
    localStorage.setItem('key-mock-3', 'abc3');
    localStorage.setItem('key-mock-4', 'abc4');

    expect(StorageService.getItem('key-mock-3')).toEqual('abc3');
    expect(StorageService.getItem('key-mock-4')).toEqual('abc4');
    StorageService.clear();
    expect(StorageService.getItem('key-mock-3')).toEqual(undefined);
    expect(StorageService.getItem('key-mock-4')).toEqual(undefined);
  });
});
