const DeliveryMethod = {
  COURIER: 'courier',
  NOVA_POSHTA: 'novaposhta',
  UKR_POSHTA: 'ukrposhta'
} as const;

type DeliveryMethodType  = (typeof DeliveryMethod)[keyof typeof DeliveryMethod];

export { type DeliveryMethodType, DeliveryMethod };