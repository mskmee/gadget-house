export const formatPhoneNumber = (value: string) => {
    value = value.replace(/\D/g, '');

    if (!value.startsWith('38')) {
      value = '38' + value;
    }

    // Limit the length of the value to 12 digits (for '+38 (xxx) xxx-xx-xx' format)
    value = value.slice(0, 12);

    let formattedValue = '+38 ';
    if (value.length > 2) formattedValue += `${value.slice(2, 5)}`;
    if (value.length > 5) formattedValue += `-${value.slice(5, 8)}`;
    if (value.length > 8) formattedValue += `-${value.slice(8, 10)}`;
    if (value.length > 10) formattedValue += `-${value.slice(10, 12)}`;

    if (formattedValue.length === 4) {
      formattedValue = '';
    }

    return formattedValue;
  };