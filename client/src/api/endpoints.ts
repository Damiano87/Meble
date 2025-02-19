export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  CART: {
    GET: "/cart/cart-items",
    ADD: (productId: string) => `/cart/${productId}/add-to-cart`,
    PATCH: (cartItemId: string) => `/cart/update-quantity/${cartItemId}`,
    DELETEALL: "/cart/remove-all",
    DELETE: (cartItemId: string) => `/cart/remove-from-cart/${cartItemId}`,
  },
  RATING: {
    GET_RATERS: (productId: string) => `/ratings/products/${productId}/raters`,
  },
  WISHLIST: {
    GET: "/wishlist",
    ADD: "/wishlist",
    DELETE: "/wishlist",
    CLEAR: "/wishlist/clear",
  },
  STRIPE: {
    CREATE_CHECKOUT_SESSION: "/stripe/api/create-checkout-session",
  },
};
