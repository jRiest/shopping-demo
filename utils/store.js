import { KV } from './bindings';

const cartKey = sessionId => `cart:${sessionId}`;
const productKey = productId => `product:${productId}`;
const imageKey = imageName => `image:${imageName}`;

export async function getCart(sessionId) {
  if (!sessionId) {
    return [];
  }
  const cart = await KV.get(cartKey(sessionId), 'json');
  return cart || [];
}

export async function setCart(sessionId, cart) {
  await KV.put(cartKey(sessionId), JSON.stringify(cart || []));
}

export async function getProduct(productId) {
  return await KV.get(productKey(productId), 'json');
}

export async function getFeaturedProducts() {
  const featuredProducts = await KV.get('featuredProducts', 'json');
  return featuredProducts || [];
}

export async function getImage(imageName) {
  return await KV.get(imageKey(imageName), 'arrayBuffer');
}
