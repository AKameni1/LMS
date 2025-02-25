'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export default function ModalForm({
  children,
}: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => router.back()}
      className="rounded border p-4 backdrop:bg-slate-300/50"
    >
      <button
        className="absolute right-4 top-2 border-none"
        onClick={() => dialogRef.current?.close()}
      >
        &times;
      </button>

      {children}
    </dialog>
  );
}
