/* eslint-disable no-unused-vars */

import { LocalStorageKey } from '../enums/local-storage-key';

interface ILocalStorageService {
  setItem(key: LocalStorageKey, value: string): void;
  getItem<T>(key: LocalStorageKey): T | null;
  removeItem(key: LocalStorageKey): void;
}

export { type ILocalStorageService };
