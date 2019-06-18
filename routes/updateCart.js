import { updateCart, getReferrerOrOrigUrl } from '../utils/request';

export default async request => {
  const headers = await updateCart(request);
  const url = getReferrerOrOrigUrl(request);

  let rsp = Response.redirect(url, 302);
  // copy it to make headers mutable
  rsp = new Response(rsp.body, rsp);

  for (const [header, value] of headers) {
    rsp.headers.append(header, value);
  }
  return rsp;
};
