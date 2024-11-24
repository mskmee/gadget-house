import { LocalStorageService } from './local-storage-service';

const localStorageService = new LocalStorageService(window.localStorage);

export { LocalStorageKey } from './libs/enums/enums';
export { localStorageService };
