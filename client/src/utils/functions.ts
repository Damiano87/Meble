// Format the price above to PLN using the locale, style, and currency.
export function formatToPLN(price: number): string {
  const zloty = price / 100;

  return zloty.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
}

// Uppercase first letter of a string
export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
