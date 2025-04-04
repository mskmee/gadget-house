export const generateHrefSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\//g, '-')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};
