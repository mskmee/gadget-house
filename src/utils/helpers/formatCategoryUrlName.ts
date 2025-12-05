export const formatCategoryUrlName = (
  categoryUrlName: string | undefined,
): string => {
  if (!categoryUrlName) return 'This category';

  if (categoryUrlName.includes('-')) {
    return (
      categoryUrlName.charAt(0).toUpperCase() +
      categoryUrlName.slice(1).split('-').join(' ')
    );
  }

  return categoryUrlName.charAt(0).toUpperCase() + categoryUrlName.slice(1);
};
