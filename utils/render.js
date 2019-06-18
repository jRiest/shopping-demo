import React from 'react';
import ReactDOMServer from 'react-dom/server';
import NotFound from '../components/NotFound';

export function renderHtmlPage(rootEl) {
  const html = '<!doctype html>' + ReactDOMServer.renderToStaticMarkup(rootEl);
  return new Response(html, { headers: { 'content-type': 'text/html' } });
}

export function renderNotFoundResponse(cart) {
  const html =
    '<!doctype html>' +
    ReactDOMServer.renderToStaticMarkup(<NotFound cart={cart} />);
  return new Response(html, {
    status: 404,
    headers: { 'content-type': 'text/html' },
  });
}

export function formatPrice(price) {
  const dollars = Math.floor(price / 100);
  const cents = price % 100;
  return `$${dollars.toLocaleString('en-US')}.${String(cents).padStart(
    2,
    '0',
  )}`;
}
