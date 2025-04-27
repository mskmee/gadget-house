const getUserInitials = (fullName: string) => {
    if (!fullName) return '';
    
    return fullName
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0].toUpperCase())
      .slice(0, 1);
  };

  export { getUserInitials };