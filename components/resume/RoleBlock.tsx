import { cn } from '@/lib/utils';
import type { Bullet } from '@/data/experience';

interface RoleBlockProps {
  title: string;
  meta?: string;
  bullets: Bullet[];
}

export default function RoleBlock({ title, meta, bullets }: RoleBlockProps) {
  return (
    <div
      className={cn(
        '[&:not(:first-child)]:border-border [&:not(:first-child)]:border-t [&:not(:first-child)]:border-dashed',
        '[&:not(:first-child)]:pt-7',
      )}
    >
      <h4
        className="text-foreground m-0 font-medium tracking-[-0.015em]"
        style={{ fontSize: 'clamp(16px, 1.5vw, 18px)' }}
      >
        {title}
      </h4>
      {meta && <div className="text-muted-foreground mt-1 text-[12px] tracking-[-0.005em]">{meta}</div>}
      <ul
        className="text-body m-0 mt-4 grid list-none gap-4 p-0"
        style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.55 }}
      >
        {bullets.map((bullet, i) => (
          <li key={i} className="relative pl-5">
            <span aria-hidden="true" className="bg-body absolute top-[0.65em] left-0 block h-px w-2" />
            {bullet.highlight ? (
              <>
                <strong>{bullet.highlight}</strong> {bullet.text}
              </>
            ) : (
              bullet.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
