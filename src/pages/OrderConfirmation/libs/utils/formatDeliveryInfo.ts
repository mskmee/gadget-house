const formatDeliveryInfo = (initialValues: {
  city?: string;
  deliveryType?: string;
  departmentNumber?: string;
  street?: string;
  houseNumber?: string;
  flat?: string;
}): string => {
  const { city, deliveryType, departmentNumber, street, houseNumber, flat } =
    initialValues;
  const parts: string[] = [];

  if (city) parts.push(city);

  if (deliveryType === 'NOVA') {
    parts.push(`Nova Poshta`);
  } else if (deliveryType === 'UKRPOSHTA') {
    parts.push(`UkrPoshta}`);
  } else if (deliveryType === 'COURIER') {
    parts.push(`By courier `);
  }

  return parts.join(', ');
};

export default formatDeliveryInfo;
