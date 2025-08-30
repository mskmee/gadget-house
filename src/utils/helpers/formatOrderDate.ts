export  const formatOrderDate = (dateString: string) => {
    if (!dateString) return;
    const date = new Date(dateString);

    const datePart = date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '.');
    const timePart = date
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      .toLowerCase()
      .replace(/\s+/g, '');

    return `${datePart} at ${timePart}`;
  };