export function parsePrice(price: string) {
  return price.replace(/\s+/g, '');
}
export function formatPrice(price: number) {
  return price.toLocaleString('ru-RU');
}