import { getCart } from '../utils/store';
import { getSessionId } from '../utils/request';
import { renderNotFoundResponse } from '../utils/render';

export default async request => {
  const sessionId = getSessionId(request);
  const cart = await getCart(sessionId);
  return renderNotFoundResponse(cart);
};
