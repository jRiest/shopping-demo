import React from 'react';
import Cart from '../components/Cart';
import { getCart, getProduct } from '../utils/store';
import { getSessionId } from '../utils/request';
import { renderHtmlPage } from '../utils/render';

export default async request => {
  const sessionId = getSessionId(request);
  const cart = await getCart(sessionId);
  const products = await Promise.all(cart.map(({ id }) => getProduct(id)));
  return renderHtmlPage(<Cart cart={cart} products={products} />);
};
