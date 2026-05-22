import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#publications', label: 'Publications' },
  { href: '#education', label: 'Education' },
];

export default function TopBar() {
  return (
    <header
      className="sticky top-0 z-20 grid grid-cols-1 items-start gap-4 backdrop-blur-[12px] min-[640px]:grid-cols-[1fr_auto]"
      style={{
        background: 'color-mix(in srgb, var(--background) 92%, transparent)',
        padding: 'clamp(16px,3vw,36px) clamp(20px,5vw,56px)',
        paddingRight: 'calc(clamp(20px,5vw,56px) + 60px)',
      }}
    >
      <div>
        <h1
          className="text-foreground m-0 leading-none font-semibold tracking-[-0.03em]"
          style={{ fontSize: 'clamp(22px, 2.6vw, 28px)' }}
        >
          Jeffery Ho
          <span className="text-muted-foreground ml-1 font-normal tracking-[-0.005em]">· Chia-Chun</span>
        </h1>
        <p
          className="text-muted-foreground m-0 mt-1 font-normal tracking-[-0.015em]"
          style={{ fontSize: 'clamp(16px, 1.8vw, 20px)' }}
        >
          Senior Engineer
        </p>
      </div>
      <nav className="mt-1 hidden min-[640px]:flex" style={{ gap: 'clamp(16px, 2vw, 28px)' }} aria-label="Primary">
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={cn(
              'text-[14px] no-underline transition-colors duration-200',
              'text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
