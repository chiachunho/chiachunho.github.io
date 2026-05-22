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
        background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
        padding: 'clamp(16px,3vw,36px) clamp(20px,5vw,56px)',
        paddingRight: 'calc(clamp(20px,5vw,56px) + 60px)',
      }}
    >
      <div>
        <h1
          className="m-0 leading-none font-semibold tracking-[-0.03em]"
          style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', color: 'var(--ink)' }}
        >
          Jeffery Ho
          <span className="ml-1 font-normal tracking-[-0.005em]" style={{ color: 'var(--mute)' }}>
            · Chia-Chun
          </span>
        </h1>
        <p
          className="m-0 mt-1 font-normal tracking-[-0.015em]"
          style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--mute)' }}
        >
          Senior Engineer
        </p>
      </div>
      <nav className="mt-1 hidden min-[640px]:flex" style={{ gap: 'clamp(16px, 2vw, 28px)' }} aria-label="Primary">
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-[14px] no-underline transition-colors duration-200"
            style={{ color: 'var(--mute)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--mute)')}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
