export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  USERS: {
    GET_USER: "/users/user",
    PATCH: "/users/delivery",
    PATCH_PASSWORD: "/users/password",
  },
  PRODUCTS: {
    GET_ALL: "/products",
    TOP_EIGHT: "/products/top-eight",
    TRENDY: "/products/trendy",
    GET_BY_ID: (id: string) => `/products/${id}`,
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
    GET_PRODUCT_RATINGS: (productId: string) =>
      `/ratings/products/${productId}/ratings`,
  },
  WISHLIST: {
    GET: "/wishlist",
    ADD: "/wishlist",
    DELETE: "/wishlist",
    CLEAR: "/wishlist/clear-wishlist",
    SEND_TO_EMAIL: "/wishlist/send-wishlist",
  },
  STRIPE: {
    CREATE_CHECKOUT_SESSION: "/stripe/api/create-checkout-session",
    VERIFY_PAYMENT: "/stripe/api/verify-payment",
  },
  ORDERS: {
    GET_ORDERS: "/orders",
    GET_ORDER: "/orders/order",
    CREATE_ORDER: "/orders",
  },
};
