import { PaymentMethodType } from '../enums/payment-method';

const formatPaymentInfo = (value: PaymentMethodType): string => {
  if (value === 'COURIER') {
    return `To courier `;
  } else {
    const cleanValue = value.replace(/_/g, ' ');
    return cleanValue.charAt(0) + cleanValue.slice(1).toLowerCase();
  }
};

export default formatPaymentInfo;
