// Format the price above to PLN using the locale, style, and currency.
export function formatToPLN(price: number): string {
  const zloty = price / 100;

  return zloty.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
}

// Uppercase first letter of a string
export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

// slice the string to the first 14 characters and add "..." at the end if in aside cart
export const sliceName = (name: string, isAsideCart?: boolean): string => {
  const slicedName =
    name.length > 10 && isAsideCart ? name.slice(0, 10) + "..." : name;
  return capitalizeFirstLetter(slicedName);
};
