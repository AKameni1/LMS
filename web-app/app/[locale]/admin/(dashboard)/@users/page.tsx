import LinkButton from '@/components/admin/link-button';
import { ScrollArea } from '@/components/admin/scroll-area';
import UserList from '@/components/admin/user-list';

export default function Page() {
  return (
    <div className="mt-4 flex-1 space-y-5 rounded-xl bg-white p-5">
      <div className="stat-info">
        <p className="truncate whitespace-nowrap text-lg font-semibold text-dark-400">
          Account Requests
        </p>
        <LinkButton href="/admin/account-requests" />
      </div>
      {/* Users List */}

      <ScrollArea className="max-h-[350px]">
        <UserList />
      </ScrollArea>
    </div>
  );
}
