const formatContactsInfo = (initialValues: {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  comment?: string;
}): string => {
  const { fullName, email, phoneNumber, comment } = initialValues;
  const parts: string[] = [];

  if (fullName) parts.push(fullName);
  if (phoneNumber) parts.push(`+38${phoneNumber}`);
  if (email) parts.push(email);
  if (comment) parts.push('You left a comment');

  return parts.join(", ");
};

export default formatContactsInfo;