import Head from 'next/head';
import type { ReactNode } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';

// ── helper components ────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className="mb-7 border-b pb-4 text-[12px] font-medium tracking-[0.01em]"
      style={{ color: 'var(--ink)', borderColor: 'var(--rule)' }}
    >
      {children}
    </div>
  );
}

function Entry({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <article
      className="grid grid-cols-1 gap-4 border-t py-7 first:border-t-0 first:pt-1 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] min-[900px]:gap-[clamp(28px,4vw,56px)]"
      style={{ borderColor: 'var(--rule)' }}
    >
      <div>{left}</div>
      <div>{right}</div>
    </article>
  );
}

function EntryTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      className="m-0 font-medium tracking-[-0.018em]"
      style={{ fontSize: 'clamp(18px, 1.9vw, 22px)', color: 'var(--ink)' }}
    >
      {children}
    </h3>
  );
}

function MetaLine({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <div className="text-[14px]" style={{ color: 'var(--mute)', marginTop: first ? '12px' : '4px' }}>
      {children}
    </div>
  );
}

function SubEntry({ children }: { children: ReactNode }) {
  return (
    <div className="mt-1 text-[clamp(16px,1.7vw,18px)]" style={{ color: 'var(--body)' }}>
      {children}
    </div>
  );
}

function RoleBlock({ title, meta, bullets }: { title: string; meta?: string; bullets: ReactNode[] }) {
  return (
    <div
      className="[&:not(:first-child)]:border-t [&:not(:first-child)]:border-dashed [&:not(:first-child)]:pt-7"
      style={{ borderColor: 'var(--rule)' }}
    >
      <h4
        className="m-0 font-medium tracking-[-0.015em]"
        style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: 'var(--ink)' }}
      >
        {title}
      </h4>
      {meta && (
        <div className="mt-1 text-[12px] tracking-[-0.005em]" style={{ color: 'var(--mute)' }}>
          {meta}
        </div>
      )}
      <ul
        className="m-0 mt-4 grid list-none gap-4 p-0"
        style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.55, color: 'var(--body)' }}
      >
        {bullets.map((b, i) => (
          <li key={i} className="relative pl-5">
            <span
              aria-hidden="true"
              className="absolute left-0 block h-px w-2"
              style={{ top: '0.65em', background: 'var(--body)' }}
            />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── page ─────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Head>
        <title>Jeffery Ho — Senior Engineer</title>
        <meta
          name="description"
          content="Jeffery Ho — senior engineer at TrendAI. React, TypeScript, full-stack, data visualisation."
        />
        <meta property="og:title" content="Jeffery Ho" />
        <meta
          property="og:description"
          content="Senior engineer at TrendAI. React, TypeScript, full-stack, data visualisation."
        />
        <meta property="og:image" content="https://jefferyho.cc/images/jeffery.jpeg" />
      </Head>

      <ThemeToggle />
      <TopBar />

      <div className="mx-auto max-w-[1440px]" style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,56px) 80px' }}>
        <div
          className="grid grid-cols-1 min-[900px]:grid-cols-[minmax(240px,1fr)_minmax(0,2.5fr)]"
          style={{ gap: 'clamp(40px,6vw,80px)' }}
        >
          <Sidebar />

          <div className="grid min-w-0" style={{ gap: 'clamp(56px,7vw,88px)' }}>
            {/* Experience */}
            <section id="experience" style={{ scrollMarginTop: 'clamp(80px,11vw,120px)' }}>
              <SectionLabel>Experience</SectionLabel>
              <div>
                <Entry
                  left={
                    <>
                      <EntryTitle>
                        <a
                          href="https://www.trendaisecurity.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          TrendAI <span style={{ color: 'var(--mute)' }}>↗</span>
                        </a>
                      </EntryTitle>
                      <MetaLine first>December 2023 – Present</MetaLine>
                      <MetaLine>Taipei, TW · 2 yr 6 mo</MetaLine>
                    </>
                  }
                  right={
                    <div className="grid gap-8">
                      <RoleBlock
                        title="Senior Engineer"
                        meta="January 2026 – Present"
                        bullets={[
                          <>
                            <strong>Hubble — Enterprise BI Platform.</strong> Took on architectural ownership of a major
                            new capability within the platform.
                          </>,
                          <>
                            Designed and delivered a fully configurable dashboard system, enabling business users to
                            compose and customise their own analytics views.
                          </>,
                          <>Drove end-to-end feature development, from system design to production delivery.</>,
                        ]}
                      />
                      <RoleBlock
                        title="Full Stack Engineer"
                        meta="December 2023 – December 2025"
                        bullets={[
                          <>
                            <strong>
                              Vulnerability Management — TrendAI Vision One™ Cyber Risk Exposure Management.
                            </strong>{' '}
                            Founding frontend member, building the vulnerability-detection experience from the ground
                            up.
                          </>,
                          <>
                            Collaborated cross-functionally with UXD and backend engineers through the full design and
                            development cycle.
                          </>,
                          <>
                            Established scalable frontend foundations: modular architecture, mock-first development,
                            RBAC, and i18n.
                          </>,
                          <>
                            <strong>Hubble — Enterprise BI Platform.</strong> Developed and maintained a full-stack
                            internal BI platform providing analytics across customer, product and partner domains.
                          </>,
                          <>
                            Built interactive dashboards and data visualisations; developed backend APIs integrating
                            Azure SQL and Azure Data Explorer (ADX).
                          </>,
                        ]}
                      />
                    </div>
                  }
                />

                <Entry
                  left={
                    <>
                      <EntryTitle>UMIKAFFA</EntryTitle>
                      <SubEntry>優咖智能股份有限公司</SubEntry>
                      <MetaLine first>August 2019 – December 2019</MetaLine>
                      <MetaLine>Taipei, TW</MetaLine>
                    </>
                  }
                  right={
                    <div className="grid gap-8">
                      <RoleBlock
                        title="Website Engineer"
                        bullets={[
                          <>Built the official brand website end-to-end with Django and Bootstrap.</>,
                          <>
                            Worked directly with the director and the in-house UI designer to scope, design and ship.
                          </>,
                        ]}
                      />
                    </div>
                  }
                />

                <Entry
                  left={
                    <>
                      <EntryTitle>Red Dot Design Award</EntryTitle>
                      <SubEntry>Taiwan Branch</SubEntry>
                      <MetaLine first>July 2018 – February 2020</MetaLine>
                      <MetaLine>Taipei, TW · 1 yr 8 mo</MetaLine>
                    </>
                  }
                  right={
                    <div className="grid gap-8">
                      <RoleBlock
                        title="CRM System Maintenance"
                        bullets={[
                          <>Processed clients&apos; profiles and established the profile-process workflow.</>,
                          <>Maintained the company Salesforce CRM system.</>,
                          <>Assisted submission events; wrote and sent EDM campaigns to clients.</>,
                        ]}
                      />
                    </div>
                  }
                />
              </div>
            </section>

            {/* Skills */}
            <section id="skills" style={{ scrollMarginTop: 'clamp(80px,11vw,120px)' }}>
              <SectionLabel>Skills</SectionLabel>
              <div className="grid grid-cols-1 gap-7 pt-1 min-[700px]:grid-cols-3 min-[700px]:gap-9">
                {[
                  {
                    heading: 'Frontend Development',
                    items: [
                      'React.js / Next.js',
                      'TypeScript / JavaScript',
                      'Redux',
                      'Highcharts.js',
                      'Tailwind CSS',
                      'Vite',
                    ],
                  },
                  {
                    heading: 'Backend & Data',
                    items: [
                      'ASP.NET Core · C#',
                      'Django · DRF',
                      'Python',
                      'Azure SQL',
                      'Azure Data Explorer',
                      'REST API design',
                    ],
                  },
                  {
                    heading: 'Research & Tools',
                    items: ['Git · GitHub', 'C / C++'],
                  },
                ].map(({ heading, items }) => (
                  <div key={heading}>
                    <h4 className="m-0 mb-3 text-[16px] font-medium tracking-[-0.01em]" style={{ color: 'var(--ink)' }}>
                      {heading}
                    </h4>
                    <ul className="m-0 list-none p-0 text-[14px] leading-[1.85]" style={{ color: 'var(--body)' }}>
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Publications */}
            <section id="publications" style={{ scrollMarginTop: 'clamp(80px,11vw,120px)' }}>
              <SectionLabel>Publications</SectionLabel>
              <div>
                <Entry
                  left={
                    <>
                      <EntryTitle>Leveraging Supplementary Information for Multi-Modal Fake News Detection</EntryTitle>
                      <MetaLine first>2023 · Master&apos;s thesis</MetaLine>
                      <MetaLine>PyTorch · BERT · Multi-modal attention</MetaLine>
                    </>
                  }
                  right={
                    <p
                      className="m-0 leading-[1.55]"
                      style={{ fontSize: 'clamp(14px,1.6vw,16px)', color: 'var(--body)' }}
                    >
                      Image-captioning generates supplementary text for news images; multi-head attention learns
                      inter-dependencies across modalities. Outperforms state-of-the-art baselines on three real-world
                      datasets.
                    </p>
                  }
                />
                <Entry
                  left={
                    <>
                      <EntryTitle>
                        A Greedy Algorithm for Budgeted Multiple-Product Profit Maximization in Social Network
                      </EntryTitle>
                      <MetaLine first>Conference paper</MetaLine>
                      <MetaLine>Social network analysis · Algorithms</MetaLine>
                    </>
                  }
                  right={
                    <p
                      className="m-0 leading-[1.55]"
                      style={{ fontSize: 'clamp(14px,1.6vw,16px)', color: 'var(--body)' }}
                    >
                      Co-authored work on a budget-aware greedy algorithm for maximising profit when seeding multiple
                      products simultaneously through a social network.
                    </p>
                  }
                />
              </div>
            </section>

            {/* Education */}
            <section id="education" style={{ scrollMarginTop: 'clamp(80px,11vw,120px)' }}>
              <SectionLabel>Education</SectionLabel>
              <div>
                <Entry
                  left={
                    <>
                      <EntryTitle>National Taiwan University of Science and Technology</EntryTitle>
                      <MetaLine first>February 2021 – July 2023</MetaLine>
                      <MetaLine>Taipei, TW</MetaLine>
                    </>
                  }
                  right={
                    <div>
                      <div className="text-[clamp(16px,1.7vw,18px)]" style={{ color: 'var(--body)' }}>
                        M.S. in Computer Science
                      </div>
                      <div className="mt-1 text-[14px]" style={{ color: 'var(--mute)' }}>
                        Thesis: Leveraging Supplementary Information for Multi-Modal Fake News Detection.
                      </div>
                    </div>
                  }
                />
                <Entry
                  left={
                    <>
                      <EntryTitle>National Taiwan University of Science and Technology</EntryTitle>
                      <MetaLine first>September 2017 – January 2021</MetaLine>
                      <MetaLine>Taipei, TW</MetaLine>
                    </>
                  }
                  right={
                    <div className="text-[clamp(16px,1.7vw,18px)]" style={{ color: 'var(--body)' }}>
                      B.S. in Computer Science
                    </div>
                  }
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer
        className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4 border-t text-[12px]"
        style={{
          padding: '32px clamp(20px,5vw,56px) 56px',
          marginTop: 'clamp(80px,10vw,120px)',
          color: 'var(--mute)',
          borderColor: 'var(--rule)',
        }}
      >
        <span>© Jeffery Ho · 2026</span>
        <span>jefferyho.cc</span>
      </footer>
    </>
  );
}
