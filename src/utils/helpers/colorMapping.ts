/**
 * Maps frontend color names to backend enum values
 * Backend expects: WHITE, BLACK, RED, GREEN, BLUE, VIOLET, GREY, GOLD, ORANGE, PINK
 */
export const mapColorToBackendEnum = (colorName: string): string | null => {
  const colorMap: Record<string, string> = {
    'White': 'WHITE',
    'Black': 'BLACK',
    'Red': 'RED',
    'Green': 'GREEN',
    'Blue': 'BLUE',
    'Purple ': 'VIOLET', // Note: frontend has 'Purple ' with trailing space
    'Purple': 'VIOLET',
    'Grey': 'GREY',
    'Gray': 'GREY',
    'Gold': 'GOLD',
    'Orange': 'ORANGE',
    'Pink': 'PINK',
    'Yellow': 'GOLD', // Mapping Yellow to GOLD as per backend enum
  };

  return colorMap[colorName] || null;
};

/**
 * Maps an array of frontend color names to backend enum values
 */
export const mapColorsToBackendEnums = (colorNames: string[]): string[] => {
  return colorNames
    .map(mapColorToBackendEnum)
    .filter((color): color is string => color !== null);
};
