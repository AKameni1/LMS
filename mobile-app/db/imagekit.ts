import config from '@/lib/config';
import ImageKit from 'imagekit-javascript';
import type { Transformation } from 'imagekit-javascript/dist/src/interfaces/Transformation';

const {
  env: {
    imageKit: { urlEndpoint, publicKey },
  },
} = config;

const imagekit = new ImageKit({
  urlEndpoint,
  publicKey,
});

export function getImagekitUrlFromPath(
  imagePath: string,
  transformationArray?: Array<Transformation>,
) {
  const ikOptions = {
    urlEndpoint,
    path: imagePath,
    transformation: transformationArray,
  };

  const imageUrl = imagekit.url(ikOptions);

  return imageUrl;
}

export function getImagekitUrlFromSrc(
  imageSrc: string,
  transformationArray?: Array<Transformation>,
) {
  const ikOptions = {
    src: imageSrc,
    transformation: transformationArray,
  };
  const imageURL = imagekit.url(ikOptions);

  return imageURL;
}
