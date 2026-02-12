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
    'Purple ': 'VIOLET',
    'Purple': 'VIOLET',
    'Grey': 'GREY',
    'Gray': 'GREY',
    'Gold': 'GOLD',
    'Orange': 'ORANGE',
    'Pink': 'PINK',
    'Yellow': 'GOLD',
    'WHITE': 'WHITE',
    'BLACK': 'BLACK',
    'RED': 'RED',
    'GREEN': 'GREEN',
    'BLUE': 'BLUE',
    'VIOLET': 'VIOLET',
    'GREY': 'GREY',
    'GOLD': 'GOLD',
    'ORANGE': 'ORANGE',
    'PINK': 'PINK',
  };

  return colorMap[colorName] ?? null;
};

/**
 * Maps an array of frontend color names to backend enum values
 */
export const mapColorsToBackendEnums = (colorNames: string[]): string[] => {
  return colorNames
    .map(mapColorToBackendEnum)
    .filter((color): color is string => color !== null);
};
