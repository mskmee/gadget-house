type BreadcrumbItem = {
  title: string;
  href?: string;
};


export const getBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .filter((s) => !/^\d+$/.test(s));

  const breadcrumbItems: BreadcrumbItem[] = [
    { title: 'Home', href: '/' },
  ];

  segments.forEach((seg, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const title = decodeURIComponent(seg)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    breadcrumbItems.push({ title, href });
  });

  if (breadcrumbItems.length > 0) {
    delete breadcrumbItems[breadcrumbItems.length - 1].href;
  }

  return breadcrumbItems;
};
