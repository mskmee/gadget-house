
export const formatKeyToLabel = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase(); 
};
