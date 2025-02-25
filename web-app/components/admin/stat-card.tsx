import { cn } from '@/lib/utils';
import Image from 'next/image';

type StatCardProps = {
  title: string;
  value: number;
  color: 'red' | 'green';
  valueChange: number;
};

export default function StatCard({
  title,
  value,
  color,
  valueChange,
}: Readonly<StatCardProps>) {
  return (
    <div className="stat">
      <div className="stat-info">
        <p className="stat-label truncate">{title}</p>
        <div
          className={cn('flex items-center justify-center gap-1', {
            'text-red-500': color === 'red',
            'text-green-500': color === 'green',
          })}
        >
          <Image
            src={`/icons/admin/caret-${color === 'red' ? 'down' : 'up'}.svg`}
            width={16}
            height={16}
            alt={`caret ${color === 'red' ? 'down' : 'up'} ${title}`}
          />
          <span className="text-sm font-semibold">
            {valueChange}
          </span>
        </div>
      </div>
      <h2 className="stat-count">{value.toString().padStart(2, '0')}</h2>
    </div>
  );
}
