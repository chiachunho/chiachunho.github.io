import { cn } from '@/lib/utils';
import { CONTACT_LINKS } from '@/data/contact';
import { PROFILE } from '@/data/profile';

export default function Sidebar() {
  return (
    <aside
      id="about"
      className="grid content-start gap-8 min-[900px]:sticky min-[900px]:self-start"
      style={{ top: 'clamp(120px, 14vw, 160px)' }}
    >
      <div
        className="h-24 w-24 rounded-full bg-[#d9d3c5] bg-cover bg-center"
        style={{ backgroundImage: `url('${PROFILE.portrait}')` }}
        aria-hidden="true"
      />
      <p
        className="border-border text-foreground m-0 border-t pt-6 leading-[1.55]"
        style={{ fontSize: 'clamp(16px, 1.4vw, 18px)' }}
      >
        {PROFILE.bio}
      </p>
      <div className="border-border grid gap-2 border-t pt-6">
        {CONTACT_LINKS.map(({ href, label, external }) => (
          <a
            key={href}
            href={href}
            className={cn(
              'inline-flex gap-2 text-[14px] no-underline transition-opacity duration-200',
              'text-foreground hover:opacity-60',
            )}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {label}
            <span className="text-muted-foreground">↗</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
