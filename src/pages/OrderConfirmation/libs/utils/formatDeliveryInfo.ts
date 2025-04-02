const formatDeliveryInfo = (initialValues: {
  city?: string;
  deliveryType?: string;
  departmentNumber?: string;
  street?: string;
  houseNumber?: string;
  flat?: string;
}): string => {
  const { city, deliveryType, departmentNumber, street, houseNumber, flat } = initialValues;
  const parts: string[] = [];

  if (city) parts.push(city);

  if (deliveryType === "NOVA" && departmentNumber) {
    parts.push(`Department of Nova Poshta #${departmentNumber}`);
  } else if (deliveryType === "UKRPOSHTA" && departmentNumber) {
    parts.push(`Department of UkrPoshta #${departmentNumber}`);
  } else if (deliveryType === "COURIER") {
    const addressParts = [street, houseNumber && `House ${houseNumber}`, flat && `Flat ${flat}`]
      .filter(Boolean)
      .join(", ");
    if (addressParts) {
      parts.push(`Courier delivery to ${addressParts}`);
    }
  }

  return parts.join(", ");
};

export default formatDeliveryInfo;