import { formatToPLN } from "@/utils/functions";
import { CartItemType } from "@/utils/types";

const Summary = ({ cartItems }: { cartItems: CartItemType[] | undefined }) => {
  // Threshold values in pennies (1 PLN = 100 groszy)
  const FREE_SHIPPING_THRESHOLD = 20000; // 200 PLN
  const SHIPPING_COST = 1599; // 15.99 PLN

  // Calculate total price of products (prices are already in groszy)
  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (!subtotal) return null;

  // Check if eligible for free shipping
  const isEligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isEligibleForFreeShipping ? 0 : SHIPPING_COST;

  // Calculate discount (example)
  const calculateDiscount = () => {
    if (subtotal >= 50000) return Math.floor(subtotal * 0.1); // 10% discount for orders above 500 PLN
    if (subtotal >= 30000) return Math.floor(subtotal * 0.05); // 5% discount for orders above 300 PLN
    return 0;
  };

  const discount = calculateDiscount();
  const totalPrice = subtotal + shippingCost - discount;

  return (
    <div className="pr-5 py-8 border-b-2 space-y-4">
      <div className="flex justify-between">
        <h4>Kwota częściowa</h4>
        <span>{formatToPLN(subtotal)}</span>
      </div>

      <div className="flex justify-between">
        <h4>Koszt wysyłki</h4>
        {isEligibleForFreeShipping ? (
          <span className="text-green-600">Darmowa dostawa</span>
        ) : (
          <span>{formatToPLN(shippingCost)}</span>
        )}
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <h4>Rabat</h4>
          <span>-{formatToPLN(discount)}</span>
        </div>
      )}

      {!isEligibleForFreeShipping && (
        <div className="text-sm text-gray-600">
          Dodaj produkty warte {formatToPLN(FREE_SHIPPING_THRESHOLD - subtotal)}{" "}
          aby uzyskać darmową przesyłkę
        </div>
      )}

      <div className="flex justify-between font-semibold text-lg pt-4 border-t">
        <h4>Kwota całkowita</h4>
        <span>{formatToPLN(totalPrice)}</span>
      </div>
    </div>
  );
};

export default Summary;
