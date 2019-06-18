import React from 'react';
import Home from '../components/Home';
import { getSessionId } from '../utils/request';
import { getCart, getFeaturedProducts } from '../utils/store';
import { renderHtmlPage } from '../utils/render';

export default async request => {
  const sessionId = getSessionId(request);
  const [cart, featuredProducts] = await Promise.all([
    getCart(sessionId),
    getFeaturedProducts(),
  ]);
  return renderHtmlPage(
    <Home cart={cart} featuredProducts={featuredProducts} />,
  );
};
