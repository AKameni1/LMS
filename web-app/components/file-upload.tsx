'use client';

import { toast } from '@/hooks/use-toast';
import config from '@/lib/config';
import { cn } from '@/lib/utils';
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from 'imagekitio-next';
import Image from 'next/image';
import { useRef, useState } from 'react';

type FileUploadPropsType = {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light';
  onFileChange: (filePath: string) => void;
  value?: string;
};

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        'Authentication request failed with status: ' +
          response.status +
          ' ' +
          errorText,
      );
    }

    const data: {
      signature: string;
      expire: number;
      token: string;
    } = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    } else {
      throw new Error('Authentication request failed: Unknown error');
    }
  }
};

export default function FileUpload({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Readonly<FileUploadPropsType>) {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === 'dark'
        ? 'bg-dark-300'
        : 'bg-light-600 border border-gray-100',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-500',
  };

  const onError = (error: unknown) => {
    if (error instanceof Error) {
      console.error(`Upload error: ${error.message}`);
    } else {
      console.error('Upload error: Unknown error');
    }

    toast({
      title: `${type[0].toUpperCase() + type.slice(1)} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
      variant: 'destructive',
    });
  };

  const onSuccess = (res: { filePath: string }) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type[0].toUpperCase() + type.slice(1)} uploaded successfully`,
      description: `${res.filePath} uploaded successfully`,
    });
  };

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: 'File size too large',
          description: 'Please upload a file less than 20MB',
          variant: 'destructive',
        });

        return false;
      }
    } else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File size too large',
          description: 'Please upload a file less than 50MB',
          variant: 'destructive',
        });

        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        className={cn('upload-btn', styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src={'/icons/upload.svg'}
          width={20}
          height={20}
          alt="Upload"
          className="size-auto object-contain"
        />

        <p className={cn('text-base', styles.placeholder)}>{placeholder}</p>

        {file && (
          <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file?.filePath && (
        <>
          {type === 'image' && (
            <IKImage
              path={file.filePath}
              width={500}
              height={300}
              loading={'lazy'}
              alt={file.filePath}
              className="rounded-lg"
            />
          )}
          {type === 'video' && (
            <IKVideo
              path={file.filePath}
              controls={true}
              className="h-96 w-full rounded-xl"
            />
          )}
        </>
      )}
    </ImageKitProvider>
  );
}
