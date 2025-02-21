import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Page() {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Book Requests</h2>
        <Button className="text-dark-200" variant="outline">
          A-Z
          <Image
            src="/icons/admin/arrow-swap.svg"
            alt="arrow-swap"
            width={16}
            height={16}
          />
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <p>Table</p>
      </div>
    </section>
  );
}
