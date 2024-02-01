export async function cartMiddleware(Astro, next) {
  const { session = {} } = Astro.locals;

  let data = await session.getData();

  if (!data) {
    return next();
  }

  let cartId = data.cartId;

  let cart = {};
  // if not cartId, create a new cart
  if (!cartId) {
    const cartStrapi = await fetch("http://localhost:1337/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {},
      }),
    }).then((res) => res.json());

    cartId = cartStrapi.data.id;

    await session.save({ cartId });
  }

  cart = await fetch(`http://localhost:1337/api/cart/${cartId}`).then((res) =>
    res.json()
  );

  // TODO: Change this for a cart manager
  Astro.locals.cart = cart;

  return next();
}
