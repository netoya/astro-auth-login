import { CartManager } from "@modules/cart/handlers/CartManager";

export async function cartMiddleware(Astro, next) {
  const cart = await CartManager.getCart(Astro);
  const user = Astro.locals.user;

  if (user) {
    const cartData = await cart.getCartData();

    if (!cartData.user) {
      await cart.setUser({ UserId: user.id });
    }
  }

  Astro.locals.cart = cart;

  return next();
}
