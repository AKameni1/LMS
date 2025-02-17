import StatCard from '@/components/admin/stat-card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Page() {
  return (
    <>
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Books Borrowed"
          value={145}
          color="red"
          valueChange={-2}
        />

        <StatCard
          title="Total Users"
          value={317}
          color="green"
          valueChange={4}
        />

        <StatCard
          title="Total Books"
          value={163}
          color="green"
          valueChange={2}
        />
      </div>

      <div className="stat lg:w-5/12">
        <div className="stat-info">
          <p className="whitespace-nowrap text-base font-medium text-dark-400">
            Borrow Requests
          </p>
          <Button className="bg-light-300 text-primary-admin transition-all duration-300 hover:bg-light-300/20">
            View all
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src="/images/borrow-requests.svg"
            width={200}
            height={200}
            alt="Borrow Requests"
          />

          <p className="text-base font-semibold text-dark-400">No Pending Book Requests</p>
          <p className="text-sm text-dark-700">
            There are no borrow requests awaiting your review at this time
          </p>
        </div>
      </div>
    </>
  );
}
