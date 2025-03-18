export const Filters: Record<string, { id: number; name: string; attributes: Record<string, number> }> = {
  ROM_MEMORY: {
    id: 1,
    name: 'builtInMemory',
    attributes: {
      '16 GB': 85,
      '32 GB': 86,
      '64 GB': 87,
      '128 GB': 1,
      '256 GB': 2,
      '512 GB and more': 3,
    },
  },
  RAM_MEMORY: {
    id: 2,
    name: 'rams',
    attributes: {
      '4 Gb': 4,
      '6 Gb': 5,
      '8 Gb': 6,
      '12 Gb': 7,
      '16 Gb': 88,
      '1 Gb': 89,
      '2 Gb': 90,
      '3 Gb': 91,
    },
  },
  COLORS:
  {
    id: 3,
    name: 'colors',
    attributes: {
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
    }
  },
  // 'colors': [
  //   'Black',
  //   'White',
  //   'Red',
  //   'Green',
  //   'Blue',
  //   'Purple ',
  //   'Yellow',
  //   'Gold',
  //   'Orange',
  //   'Pink',
  // ],
  NUMBER_OF_PROCESSOR_CORES: {
    id: 14,
    name: 'cores',
    attributes: {
      '8 Cores': 52,
      '4 Cores': 53,
      '6 Cores': 73,
      '10 Cores': 92,
      '4+4 Cores': 93, 
    }
  },
  DISPLAY_DIAGONAL: {
    id: 4,
    name: 'displayDiagonal',
    attributes: {
      '6.69 inches': 20,
      '6.5 inches': 21,
      '6.8 inches': 22,
      '6.1 inches': 23,
      '6.12 inches': 24,
      '6.06 inches': 25,
      '11 inches': 62,
      '14 inches': 63,
      '15.6 inches': 64
    }
  },
  SCREEN_RESOLUTION: {
    id: 5,
    name: 'screenResolution',
    attributes: {
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
    }
  },
  SCREEN_TYPE: {
    id: 6,
    name: 'screenType',
    attributes: {
      'LTPS': 94,
      'LCD': 95,
      'TFT': 69,
      'Super Retina XDR': 32,
      'Retina': 96,
      'PLS': 97,
      'OLED': 98,
      'Super Amoled': 33,
      'Fluid Amoled': 99,
      'Dynamic Amoled 2X': 34,
      'Amoled': 70,
      'pOLED': 100,
      'IPS': 68,
      'Liquid Retina': 80,
    },
  },
  SCREEN_REFRESH_RATE: {
    id: 7,
    name: 'screenRefreshRate',
    attributes: {
      '60 Hz': 36,
      '90 Hz': 37,
      '120 Hz': 35,
      // '144 Hz': 3,
      // '240 Hz': 4,
    },
  },
  GLASS_PROTECTION_TECHNOLOGY: {
    id: 8,
    name: 'glassProtectionTechnology',
    attributes: {
      'Corning Gorilla Glass 7': 38,
      'Corning Gorilla Glass Victus': 39,
      'Corning Gorilla Glass 5': 40,
      'Corning Gorilla Glass 3': 41,
    },
  },
  COMMUNICATION_STANDARD: {
    id: 9,
    name: 'communicationStandard',
    attributes: {
      '5G': 42,
      '4G LTE': 43,
    }
  },
  NUMBER_OF_SIM_CARDS: {
    id: 10,
    name: 'numberOfSimCards',
    attributes: {
      '2': 44,
      '1': 45,
    },
  },
  SIM_CARD_SIZE: {
    id: 11,
    name: 'simCardSize',
    attributes: {
      'Nano-SIM': 46,
      'Micro-SIM': 47,
    },
  },
  OPERATING_SYSTEM: {
    id: 12,
    name: 'operatingSystem',
    attributes: {
      'iOS': 48,
      'Android': 49,
      'Windows': 74,
      'Linux': 83,
      'MacOS': 84,
    },
  },
  PROCESSOR_FREQUENCY: {
    id: 13,
    name: 'processorFrequency',
    attributes: {
      '3.0 GHz': 50,
      '2.3 GHz': 51,
      '2.1 GHz': 72,
      '4.2 GHz': 78,
      '3.6 GHz': 82,
    },
  },
  PROCESSOR_MODEL: {
    id: 15,
    name: 'processorModel',
    attributes: {
      'A14 Bionic': 54,
      'Snapdragon 888': 55,
      'AMD Ryzen 5 5500U': 71,
      'Intel Core i5-1135G7': 77,
      'Apple M3': 81,
    },
  },
  MEMORY_SLOT: {
    id: 16,
    name: 'memorySlot',
    attributes: {
      'Yes': 56,
      'No': 57,
    },
  },
  FLESH_CARD: {
    id: 19,
    name: 'fleshCard',
    attributes: {
      '4 Gb': 101,
      '8 Gb': 102,
      '16 Gb': 103,
      '32 Gb': 104,
      '64 Gb': 105,
      '128 Gb': 106,
      '256 Gb': 107,
    },
  },
  SENSOR_RESOLUTION: {
    id: 17,
    name: 'sensorResolution',
    attributes: {
      '108 MP': 58,
      '12 MP': 59,
    },
  },
  VIDEO_CARD: {
    id: 18,
    name: 'videoCard',
    attributes: {
      'AMD Radeon RX 6700 XT': 60,
      'NVIDIA RTX 3060': 61,
      'Intel UHD Graphics 620': 75,
      'Integrated': 76,
    },
  },
} as const;