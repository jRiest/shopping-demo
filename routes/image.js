import assert from 'assert';
import mime from 'mime';
import { getImage } from '../utils/store';

export default async request => {
  const imageName = new URL(request.url).pathname.match(/\/images\/([^/]+)/)[1];
  assert(imageName, 'Unable to parse image name from url ' + request.url);
  const image = await getImage(imageName);
  return new Response(image, {
    headers: {
      'content-type': mime.getType(imageName),
      'cache-control': 'public, max-age=3600',
    },
  });
};
