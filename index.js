const Router = require('./router');

addEventListener('fetch', event => {
  event.respondWith(catchErrors(handleRequest(event.request)));
});

async function catchErrors(promise) {
  try {
    return await promise;
  } catch (e) {
    console.log(e.stack);
    return new Response('Internal server error', { status: 500 });
  }
}

async function handleRequest(request) {
  // redirect http: to https:
  if (new URL(request.url).protocol === 'http:') {
    const url = new URL(request.url);
    url.protocol = 'https:';
    return Response.redirect(url, 307);
  }

  const r = new Router();
  r.get('/', require('./routes/home').default);
  r.get('/cart', require('./routes/cart').default);
  r.get(/\/products\/\d+/, require('./routes/product').default);
  r.get(/\/images\/[^/]+/, require('./routes/image').default);
  r.post('/update-cart', require('./routes/updateCart').default);

  // catch-all 404 route
  r.all(require('./routes/notFound').default);

  const resp = await r.route(request);
  return resp;
}
