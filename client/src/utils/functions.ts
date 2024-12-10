// Format the price above to PLN using the locale, style, and currency.

export function formatToPLN(price: number): string {
  // Konwersja na złotówki z zaokrągleniem do 2 miejsc po przecinku
  const zloty = price / 100;

  // Formatowanie z separatorem tysięcy i 2 miejscami po przecinku
  return zloty.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
}

// Uppercase first letter of a string
export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
