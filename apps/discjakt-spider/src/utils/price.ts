export function parsePriceString(value: string): number {
  const clean = value.replace(",-", "").replace(",", ".");

  const num = Number(clean);
  if (isNaN(num)) {
    return 0;
  }

  return num;
}
