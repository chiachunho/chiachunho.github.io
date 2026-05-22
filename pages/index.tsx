import Head from 'next/head';
import ThemeToggle from '@/components/ThemeToggle';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';
import SectionLabel from '@/components/resume/SectionLabel';
import Entry from '@/components/resume/Entry';
import EntryTitle from '@/components/resume/EntryTitle';
import MetaLine from '@/components/resume/MetaLine';
import SubEntry from '@/components/resume/SubEntry';
import RoleBlock from '@/components/resume/RoleBlock';
import { PROFILE } from '@/data/profile';
import { EXPERIENCES } from '@/data/experience';
import { SKILL_GROUPS } from '@/data/skills';
import { PUBLICATIONS } from '@/data/publications';
import { EDUCATION } from '@/data/education';

const SCROLL_MARGIN = 'clamp(80px,11vw,120px)';

export default function Home() {
  return (
    <>
      <Head>
        <title>{PROFILE.meta.title}</title>
        <meta name="description" content={PROFILE.meta.description} />
        <meta property="og:title" content={PROFILE.name} />
        <meta property="og:description" content={PROFILE.meta.ogDescription} />
        <meta property="og:image" content={PROFILE.meta.ogImage} />
      </Head>

      <ThemeToggle />
      <TopBar />

      <div className="mx-auto max-w-360" style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,56px) 80px' }}>
        <div
          className="grid grid-cols-1 min-[900px]:grid-cols-[minmax(240px,1fr)_minmax(0,2.5fr)]"
          style={{ gap: 'clamp(40px,6vw,80px)' }}
        >
          <Sidebar />

          <div className="grid min-w-0" style={{ gap: 'clamp(56px,7vw,88px)' }}>
            {/* Experience */}
            <section id="experience" style={{ scrollMarginTop: SCROLL_MARGIN }}>
              <SectionLabel>Experience</SectionLabel>
              <div>
                {EXPERIENCES.map((exp) => (
                  <Entry
                    key={exp.company}
                    left={
                      <>
                        <EntryTitle>
                          {exp.companyLink ? (
                            <a
                              href={exp.companyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {exp.company} <span className="text-muted-foreground">↗</span>
                            </a>
                          ) : (
                            exp.company
                          )}
                        </EntryTitle>
                        {exp.companySubtitle && <SubEntry>{exp.companySubtitle}</SubEntry>}
                        <MetaLine first>{exp.dates}</MetaLine>
                        <MetaLine>{exp.location}</MetaLine>
                      </>
                    }
                    right={
                      <div className="grid gap-8">
                        {exp.roles.map((role) => (
                          <RoleBlock key={role.title} title={role.title} meta={role.meta} bullets={role.bullets} />
                        ))}
                      </div>
                    }
                  />
                ))}
              </div>
            </section>

            {/* Skills */}
            <section id="skills" style={{ scrollMarginTop: SCROLL_MARGIN }}>
              <SectionLabel>Skills</SectionLabel>
              <div className="grid grid-cols-1 gap-7 pt-1 min-[700px]:grid-cols-3 min-[700px]:gap-9">
                {SKILL_GROUPS.map(({ heading, items }) => (
                  <div key={heading}>
                    <h4 className="text-foreground m-0 mb-3 text-[16px] font-medium tracking-[-0.01em]">{heading}</h4>
                    <ul className="text-body m-0 list-none p-0 text-[14px] leading-[1.85]">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Publications */}
            <section id="publications" style={{ scrollMarginTop: SCROLL_MARGIN }}>
              <SectionLabel>Publications</SectionLabel>
              <div>
                {PUBLICATIONS.map((pub) => (
                  <Entry
                    key={pub.title}
                    left={
                      <>
                        <EntryTitle>{pub.title}</EntryTitle>
                        <MetaLine first>{pub.meta}</MetaLine>
                        <MetaLine>{pub.tags}</MetaLine>
                      </>
                    }
                    right={
                      <p className="text-body m-0 leading-[1.55]" style={{ fontSize: 'clamp(14px,1.6vw,16px)' }}>
                        {pub.description}
                      </p>
                    }
                  />
                ))}
              </div>
            </section>

            {/* Education */}
            <section id="education" style={{ scrollMarginTop: SCROLL_MARGIN }}>
              <SectionLabel>Education</SectionLabel>
              <div>
                {EDUCATION.map((edu, i) => (
                  <Entry
                    key={`${edu.school}-${i}`}
                    left={
                      <>
                        <EntryTitle>{edu.school}</EntryTitle>
                        <MetaLine first>{edu.dates}</MetaLine>
                        <MetaLine>{edu.location}</MetaLine>
                      </>
                    }
                    right={
                      <div>
                        <div className="text-body" style={{ fontSize: 'clamp(16px,1.7vw,18px)' }}>
                          {edu.degree}
                        </div>
                        {edu.thesis && <div className="text-muted-foreground mt-1 text-[14px]">{edu.thesis}</div>}
                      </div>
                    }
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer
        className="border-border text-muted-foreground mx-auto flex max-w-360 flex-wrap justify-between gap-4 border-t text-[12px]"
        style={{
          padding: '32px clamp(20px,5vw,56px) 56px',
          marginTop: 'clamp(80px,10vw,120px)',
        }}
      >
        <span>{PROFILE.footer.copyright}</span>
        <span>{PROFILE.footer.domain}</span>
      </footer>
    </>
  );
}
