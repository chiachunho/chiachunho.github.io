const CONTACT_LINKS = [
  { href: 'mailto:chiachun2491@gmail.com', label: 'chiachun2491@gmail.com' },
  { href: 'https://github.com/chiachunho', label: 'github.com/chiachunho', external: true },
  { href: 'https://www.linkedin.com/in/jefferyho-cc/', label: 'linkedin.com/in/jefferyho-cc', external: true },
  { href: 'https://blog.jefferyho.cc', label: 'blog.jefferyho.cc', external: true },
  { href: '/files/resume_240610_public.pdf', label: 'résumé · PDF' },
];

export default function Sidebar() {
  return (
    <aside
      id="about"
      className="grid content-start gap-8 min-[900px]:sticky min-[900px]:self-start"
      style={{ top: 'clamp(120px, 14vw, 160px)' }}
    >
      <div
        className="h-24 w-24 rounded-full bg-[#d9d3c5] bg-cover bg-center"
        style={{ backgroundImage: "url('https://jefferyho.cc/images/jeffery.jpeg')" }}
        aria-hidden="true"
      />
      <p
        className="m-0 border-t pt-6 leading-[1.55]"
        style={{
          fontSize: 'clamp(16px, 1.4vw, 18px)',
          color: 'var(--ink)',
          borderColor: 'var(--rule)',
        }}
      >
        I&apos;m a frontend-focused engineer at TrendAI who gets genuinely excited about data analytics and
        visualization. I&apos;ve spent two-plus years building products at the intersection of data and user experience
        — from configurable dashboards to vulnerability-management UIs built from scratch.
      </p>
      <div className="grid gap-2 border-t pt-6" style={{ borderColor: 'var(--rule)' }}>
        {CONTACT_LINKS.map(({ href, label, external }) => (
          <a
            key={href}
            href={href}
            className="inline-flex gap-2 text-[14px] no-underline transition-opacity duration-200 hover:opacity-60"
            style={{ color: 'var(--ink)' }}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {label}
            <span style={{ color: 'var(--mute)' }}>↗</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
