import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function Entry({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <article
      className={cn(
        'border-border grid grid-cols-1 gap-4 border-t py-7',
        'first:border-t-0 first:pt-1',
        'min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] min-[900px]:gap-[clamp(28px,4vw,56px)]',
      )}
    >
      <div>{left}</div>
      <div>{right}</div>
    </article>
  );
}
