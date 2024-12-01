// Format the price above to PLN using the locale, style, and currency.
export const formatToPLN = (price: number) => {
  return new Intl.NumberFormat("en-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);
};

// Uppercase first letter of a string
export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
