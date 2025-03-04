'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

enum Error {
  Configuration = 'Configuration',
  AccessDenied = 'AccessDenied',
  Verification = 'Verification',
  Default = 'Default',
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{' '}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
    </p>
  ),
  [Error.AccessDenied]: (
    <p>
      Your access was denied because your account has been rejected. Please
      contact us if this error persists. Unique error code:{' '}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">AccessDenied</code>
    </p>
  ),
  [Error.Verification]: (
    <p>
      There was a problem verifying your account. Please contact us if this
      error persists. Unique error code:{' '}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Verification</code>
    </p>
  ),
  [Error.Default]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{' '}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Default</code>
    </p>
  ),
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get('error') as Error;

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-2">
      <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow transition-all duration-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Something went wrong
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[error] || 'Please contact us if this error persists.'}
        </div>
      </div>
      <Link href="/sign-in" className="form-btn">
        Go back to Sign In
      </Link>
    </div>
  );
}
