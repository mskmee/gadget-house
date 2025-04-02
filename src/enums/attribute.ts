const RomMemory = {
  // '16 Gb': 4,
  // '32 Gb': 5,
  // '64 Gb': 6,
  '128 Gb': 1,
  '256 Gb': 2,
  '512 Gb': 3,
} as const;

const RamMemory = {
  '4 Gb': 4,
  '6 Gb': 5,
  '8 Gb': 6,
  '12 Gb': 7,
  // '16 Gb': 2,
  // '1 Gb': 3,
  // '1 Gb': 3,
  // '3 Gb': 3,
} as const;

const Colors = {
  'BBB5A9': 8,
  '354763': 9,
  '4A4B4D': 10,
  '71F2A5': 11,
  '32C0F0': 12,
  'FFCCC8': 13,
  '808080': 14,
  'F0E1B9': 15,
  'F5F5F5': 16,
  'B484D8': 17,
  'FEF2F2': 18,
  'E7CEFD': 19,
  // 'FFCCC8': 3,
} as const;

const DisplayDiagonal = {
  '6.69 inches': 20,
  '6.5 inches': 21,
  '6.8 inches': 22,
  '6.1 inches': 23,
  '6.12 inches': 24,
  '6.06 inches': 25,
  '11 inches': 62,
  '14 inches': 63,
  '15.6 inches': 64
} as const;

const ScreenResolution = {
  '2796x1290 pixels': 26,
  '1080x2340 pixels': 27,
  '1440x3120 pixels': 28,
  '1080x2350 pixels': 29,
  '2556x1179 pixels': 30,
  '2532x1170 pixels': 31,
  '2388x1668 pixels': 65,
  '2560x1600 pixels': 66,
  '1920x1080 pixels': 67,
  '2880x1864 pixels': 79,
} as const;

const ScreenType = {
  'Super Retina XDR OLED': 32,
  'Super AMOLED': 33,
  'Dynamic AMOLED 2X': 34,
  'IPS': 68,
  'TFT': 69,
  'AMOLED': 70,
  'Liquid Retina': 80,
  // 'IPS': 35,
} as const;

const ScreenRefreshRate = {
  '120 Hz': 35,
  '60 Hz': 36,
  '90 Hz': 37,
  // '144 Hz': 39,
} as const;

const GlassProtectionTechnology = {
  'Corning Gorilla Glass 7': 38,
  'Corning Gorilla Glass Victus': 39,
  'Corning Gorilla Glass 5': 40,
  'Corning Gorilla Glass 3': 41,
  // 'Corning Gorilla Glass 5': 42,
} as const;

const CommunicationStandard = {
  '5G': 42,
  '4G LTE': 43,
  // '3G': 45,
} as const;

const NumberOfSimCards = {
  '2': 44,
  '1': 45,
  // '4': 47,
} as const;

const SimCardSize = {
  'Nano-SIM': 46,
  'Micro-SIM': 47,
  // 'Nano SIM': 49,
} as const;

const OperatingSystem = {
  'iOS': 48,
  'Android': 49,
  'Windows': 74,
  'Linux': 83,
  'MacOS': 84,
} as const;

const ProcessorFrequency = {
  '3.0 GHz': 50,
  '2.3 GHz': 51,
  '2.1 GHz': 72,
  '4.2 GHz': 78,
  '3.6 GHz': 82,
  // '2.9 GHz': 55,
} as const;

const NumberOfProcessorCores = {
  'Octa-core': 52,
  'Quad-core': 53,
  'Hexa-core': 73,
} as const;

const ProcessorModel = {
  'A14 Bionic': 54,
  'Snapdragon 888': 55,
  'AMD Ryzen 5 5500U': 71,
  'Intel Core i5-1135G7': 77,
  'Apple M3': 81,
} as const;

const FleshCard = {
  'Yes': 56,
  'No': 57,
} as const;

const SensorResolution = {
  '108 MP': 58,
  '12 MP': 59,
} as const;

const VideoCard = {
  'AMD Radeon RX 6700 XT': 60,
  'NVIDIA RTX 3060': 61,
  'Intel UHD Graphics 620': 75,
  'Integrated': 76,
} as const;

const Attribute = {
  ROM_MEMORY: 1,
  RAM_MEMORY: 2,
  COLOR: 3,
  DISPLAY_DIAGONAL: 4,
  SCREEN_RESOLUTION: 5,
  SCREEN_TYPE: 6,
  SCREEN_REFRESH_RATE: 7,
  GLASS_PROTECTION_TECHNOLOGY: 8,
  COMMUNICATION_STANDARD: 9,
  NUMBER_OF_SIM_CARDS: 10,
  SIM_CARD_SIZE: 11,
  OPERATING_SYSTEM: 12,
  PROCESSOR_FREQUENCY: 13,
  NUMBER_OF_PROCESSOR_CORES: 14,
  PROCESSOR_MODEL: 15,
  FLESH_CARD: 16,
  SENSOR_RESOLUTION: 17,
  VIDEO_CARD: 18,
} as const;

const attributeValuesMap = {
  [Attribute.ROM_MEMORY]: RomMemory,
  [Attribute.RAM_MEMORY]: RamMemory,
  [Attribute.COLOR]: Colors,
  [Attribute.DISPLAY_DIAGONAL]: DisplayDiagonal,
  [Attribute.SCREEN_RESOLUTION]: ScreenResolution,
  [Attribute.SCREEN_TYPE]: ScreenType,
  [Attribute.SCREEN_REFRESH_RATE]: ScreenRefreshRate,
  [Attribute.GLASS_PROTECTION_TECHNOLOGY]: GlassProtectionTechnology,
  [Attribute.COMMUNICATION_STANDARD]: CommunicationStandard,
  [Attribute.NUMBER_OF_SIM_CARDS]: NumberOfSimCards,
  [Attribute.SIM_CARD_SIZE]: SimCardSize,
  [Attribute.OPERATING_SYSTEM]: OperatingSystem,
  [Attribute.PROCESSOR_FREQUENCY]: ProcessorFrequency,
  [Attribute.NUMBER_OF_PROCESSOR_CORES]: NumberOfProcessorCores,
  [Attribute.PROCESSOR_MODEL]: ProcessorModel,
  [Attribute.FLESH_CARD]: FleshCard,
  [Attribute.SENSOR_RESOLUTION]: SensorResolution,
  [Attribute.VIDEO_CARD]: VideoCard,
} as const;

// eslint-disable-next-line no-redeclare
type Attribute = (typeof Attribute)[keyof typeof Attribute];

export { Attribute, attributeValuesMap };
