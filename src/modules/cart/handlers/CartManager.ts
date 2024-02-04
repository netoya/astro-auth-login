export const CartManager = {
  async getCart(Astro) {
    const { session = {} } = Astro.locals;

    let data = await session.getData();

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

    const resp = await fetch(
      `http://localhost:1337/api/carts/${cartId}?populate=*`
    ).then((res) => res.json());

    cart = resp.data;
    if (!cart) {
      return null;
    }
    /**
     * TODO:
     * - si se elimina el carrito desde strapi
     * - crear nuevo carrito y asignarle el id
     */

    return new CartEntity(Astro, cart);
  },
};

export class CartEntity {
  private Astro;
  private cart = {};
  private products = [];

  constructor(Astro, cart) {
    console.log({ cart });
    this.Astro = Astro;
    this.cart = cart;
  }

  async getCartData() {
    return this.cart;
  }

  async reloadCart() {
    const resp = await fetch(
      `http://localhost:1337/api/carts/${this.cart.id}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    this.cart = resp.data;
  }

  async setUser({ UserId }) {
    await fetch(`http://localhost:1337/api/carts/${this.cart.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          user: UserId,
        },
      }),
    });

    await this.reloadCart();
  }

  async reloadProducts() {
    const resp = await fetch(
      `http://localhost:1337/api/cart-products/?cart=${this.cart.id}&populate=product`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
    this.products = resp.data;
  }

  async getProducts() {
    if (!this.products.length) {
      await this.reloadProducts();
    }

    return this.products;
  }

  async addProduct({ productID, quantity }) {
    const resp = await fetch(`http://localhost:1337/api/cart-products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          cart: this.cart.id,
          product: productID,
          quantity,
        },
      }),
    }).then((res) => res.json());

    await this.reloadProducts();

    return this.products.find((p) => p.id === resp.data.id);
  }

  async removeProduct({ cardProductId }) {
    await fetch(`http://localhost:1337/api/cart-products/${cardProductId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedCardProduct = this.products.find(
      (p) => p.id === cardProductId
    );
    await this.reloadProducts();

    return deletedCardProduct;
  }

  async updateProduct({ cardProductId, quantity }) {
    await fetch(`http://localhost:1337/api/cart-products/${cardProductId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          quantity,
        },
      }),
    });

    await this.reloadProducts();
    return this.products.find((p) => p.id === cardProductId);
  }
}
