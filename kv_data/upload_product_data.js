// This is a script for uploading the product data to Workers KV

const request = require('request-promise');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const { API_EMAIL, API_KEY, ACCOUNT_ID, KV_NAMESPACE_ID } = process.env;

const featuredProducts = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'featured_products.json'), 'utf8'),
);

async function upload(key, data) {
  console.log(`Uploading ${key}`);
  await request({
    uri: `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${key}`,
    method: 'PUT',
    headers: {
      'X-Auth-Email': API_EMAIL,
      'X-Auth-Key': API_KEY,
    },
    body: data,
  });
}

async function uploadFeaturedProducts() {
  await upload('featuredProducts', JSON.stringify(featuredProducts));
}

async function uploadProducts() {
  for (const product of featuredProducts) {
    await upload(`product:${product.id}`, JSON.stringify(product));

    const imageName = path.basename(product.image);
    const imageData = fs.readFileSync(
      path.join(__dirname, 'images', imageName),
    );
    await upload(`image:${imageName}`, imageData);

    const smallImageName = imageName.replace(/\.[a-z]+$/, '-small.jpg');
    const smallImageData = await sharp(imageData)
      .resize({
        width: 500,
        height: 500,
        fit: 'inside',
        withoutEnlargement: true,
        fastShrinkOnLoad: true,
      })
      .jpeg({
        progressive: true,
      })
      .toBuffer();
    await upload(`image:${smallImageName}`, smallImageData);
  }
}

async function uploadLogos() {
  const dir = path.join(__dirname, 'logos');
  const files = fs.readdirSync(dir);
  for (const filename of files) {
    await upload(
      `image:${filename}`,
      fs.readFileSync(path.join(dir, filename)),
    );
  }
}

(async () => {
  try {
    await uploadFeaturedProducts();
    await uploadLogos();
    await uploadProducts();
    console.log('Done');
  } catch (e) {
    console.log(e);
  }
})();
