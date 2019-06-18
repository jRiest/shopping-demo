import { v4 } from 'uuid';
import assert from 'assert';
import { getCart, setCart } from './store';

const SESSION_COOKIE_NAME = 'cart_session';

function generateSessionId() {
  return v4().replace(/-/g, '');
}

function setSessionCookie(sessionId) {
  return new Map([
    [
      'Set-Cookie',
      `${SESSION_COOKIE_NAME}=${sessionId}; max-age=630720000; Path=/; Secure; HttpOnly`,
    ],
  ]);
}

function deleteSessionCookie() {
  return new Map([
    [
      'Set-Cookie',
      `${SESSION_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    ],
  ]);
}

export function getSessionId(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookie = cookieHeader
    .split(';')
    .map(str => str.trim())
    .find(str => str.startsWith(`${SESSION_COOKIE_NAME}=`));

  if (cookie) {
    return cookie.substr(cookie.indexOf('=') + 1);
  }
}

// Returns the referrer URL if there is one, otherwise
// returns the URL of the request
export function getReferrerOrOrigUrl(request) {
  return request.headers.get('referer') || request.url;
}

// Updates the data in the store and then returns the headers
// that will need to be added to the response
export async function updateCart(request) {
  const origSessionId = getSessionId(request);
  const cart = await getCart(origSessionId);

  const formData = await request.formData();
  const id = parseInt(formData.get('id'));
  assert(id, 'Missing ID param');
  const delta = parseInt(formData.get('delta')) || 0;

  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    // Adjusting existing item
    const newQty = cart[index].qty + delta;
    if (newQty > 0) {
      cart[index].qty = newQty;
    } else {
      cart.splice(index, 1);
    }
  } else if (delta > 0) {
    // Adding new item
    cart.push({
      id: id,
      qty: delta,
    });
  }

  if (cart && cart.length) {
    const newSessionId = generateSessionId();
    await setCart(newSessionId, cart);
    return setSessionCookie(newSessionId);
  } else {
    return deleteSessionCookie();
  }
}
