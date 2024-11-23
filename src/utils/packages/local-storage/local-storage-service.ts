import { LocalStorageKey } from './libs/enums/enums';
import { ILocalStorageService } from './libs/interfaces/interfaces';
import { SERIALIZED_KEYS } from './libs/constants/constants';

class LocalStorageService implements ILocalStorageService {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  setItem(key: LocalStorageKey, value: unknown): void {
    if (SERIALIZED_KEYS.includes(key)) {
      value = JSON.stringify(value);
    }
    this.storage.setItem(key, String(value));
  }

  getItem<T>(key: LocalStorageKey): T | null {
    const result = this.storage.getItem(key);

    if (!result) return null;

    if (SERIALIZED_KEYS.includes(key)) {
      return JSON.parse(result as string) as T | null;
    }

    return this.storage.getItem(key) as T | null;
  }

  removeItem(key: LocalStorageKey): void {
    this.storage.removeItem(key);
  }
}

export { LocalStorageService };
