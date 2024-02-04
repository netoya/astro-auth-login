import { CartManager } from "@modules/cart/handlers/CartManager";

export async function cartMiddleware(Astro, next) {
  let cart = await CartManager.getCart(Astro);
  const user = Astro.locals.user;
  const session = Astro.locals.session;
  if (!cart) {
    session.save({ cartId: null });

    cart = await CartManager.getCart(Astro);
    return next();
  }

  if (user && cart) {
    const cartData = await cart.getCartData();

    if (!cartData.user) {
      await cart.setUser({ UserId: user.id });
    }
  }

  Astro.locals.cart = cart;

  return next();
}
