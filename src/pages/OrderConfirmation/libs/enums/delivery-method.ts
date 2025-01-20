const DeliveryMethod = {
  COURIER: 'COURIER',
  NOVA_POSHTA: 'NOVAPOSHTA',
  UKR_POSHTA: 'UKRPOSHTA'
} as const;

type DeliveryMethodType  = (typeof DeliveryMethod)[keyof typeof DeliveryMethod];

export { type DeliveryMethodType, DeliveryMethod };