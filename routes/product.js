import React from 'react';
import assert from 'assert';
import ProductDetail from '../components/ProductDetail';
import { getCart, getProduct } from '../utils/store';
import { getSessionId } from '../utils/request';
import { renderHtmlPage } from '../utils/render';
import { renderNotFoundResponse } from '../utils/render';

export default async request => {
  const sessionId = getSessionId(request);
  const productId = parseInt(
    new URL(request.url).pathname.match(/\/products\/(\d+)/)[1],
  );
  assert(productId, 'Unable to parse product ID from url ' + request.url);
  const [cart, product] = await Promise.all([
    getCart(sessionId),
    getProduct(productId),
  ]);
  if (!product) {
    return renderNotFoundResponse(cart);
  }
  return renderHtmlPage(<ProductDetail cart={cart} product={product} />);
};
