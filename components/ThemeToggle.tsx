import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const toggle = () => {
    const r = document.documentElement;
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const cur = r.getAttribute('data-theme') || (sysDark ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    r.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  };

  return (
    <button
      type="button"
      aria-label="Toggle light/dark mode"
      onClick={toggle}
      className={cn(
        'fixed z-50 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border p-0',
        'bg-background text-foreground border-border-strong',
        'hover:border-foreground transition-[border-color,transform] duration-200 active:scale-95',
      )}
      style={{
        top: 'clamp(16px, 2.4vw, 28px)',
        right: 'clamp(16px, 2.4vw, 28px)',
      }}
    >
      <svg
        className="icon-moon h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <svg
        className="icon-sun h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
