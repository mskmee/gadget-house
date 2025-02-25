export const getStrengthPassword = (score: number) => {
  switch (score) {
    case 0:
    case 1:
      return 'Very weak';
    case 2:
      return 'Weak';
    case 3:
      return 'Good';
    case 4:
      return 'Strong';
    default:
      return '';
  }
};
