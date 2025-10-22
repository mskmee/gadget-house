const formatPaymentInfo = (value: string): string => {
  const cleanValue = value.replace(/_/g, ' ');
  return cleanValue.charAt(0) + cleanValue.slice(1).toLowerCase();
};

export default formatPaymentInfo;
