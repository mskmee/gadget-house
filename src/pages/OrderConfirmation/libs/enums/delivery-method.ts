const DeliveryMethod = {
  DEFAULT: '',
  COURIER: 'COURIER',
  NOVA_POSHTA: 'NOVA',
  UKR_POSHTA: 'UKRPOSHTA',
} as const;

type DeliveryMethodType = (typeof DeliveryMethod)[keyof typeof DeliveryMethod];

export { type DeliveryMethodType, DeliveryMethod };
