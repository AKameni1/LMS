'use client';

import config from '@/lib/config';
import { IKVideo, ImageKitProvider } from 'imagekitio-next';

export default function BookVideo({
  videoUrl,
}: Readonly<{ videoUrl: string }>) {
  return (
    <ImageKitProvider
      publicKey={config.env.imageKit.publicKey}
      urlEndpoint={config.env.imageKit.urlEndpoint}
    >
      <IKVideo path={videoUrl} controls={true} className="w-full rounded-xl" />
    </ImageKitProvider>
  );
}
