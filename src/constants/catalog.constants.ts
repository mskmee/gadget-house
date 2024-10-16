import { generatePhoneData } from '@/utils/generatePhoneData.utils';

const DEFAULT_FAKE_DATA_SIZE = 200;

export const PAGE_SIZE = 32;

export const PHONES_DATA = generatePhoneData(DEFAULT_FAKE_DATA_SIZE);
