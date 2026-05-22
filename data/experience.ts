export interface Bullet {
  /** Optional bold text rendered before `text` (typically a project / product name). */
  highlight?: string;
  text: string;
}

export interface Role {
  title: string;
  meta?: string;
  bullets: Bullet[];
}

export interface ExperienceEntry {
  company: string;
  companyLink?: string;
  companySubtitle?: string;
  dates: string;
  location: string;
  roles: Role[];
}

export const EXPERIENCES: ExperienceEntry[] = [
  {
    company: 'TrendAI',
    companyLink: 'https://www.trendaisecurity.com',
    dates: 'December 2023 – Present',
    location: 'Taipei, TW · 2 yr 6 mo',
    roles: [
      {
        title: 'Senior Engineer',
        meta: 'January 2026 – Present',
        bullets: [
          {
            highlight: 'Hubble — Enterprise BI Platform.',
            text: 'Took on architectural ownership of a major new capability within the platform.',
          },
          {
            text: 'Designed and delivered a fully configurable dashboard system, enabling business users to compose and customise their own analytics views.',
          },
          {
            text: 'Drove end-to-end feature development, from system design to production delivery.',
          },
        ],
      },
      {
        title: 'Full Stack Engineer',
        meta: 'December 2023 – December 2025',
        bullets: [
          {
            highlight: 'Vulnerability Management — TrendAI Vision One™ Cyber Risk Exposure Management.',
            text: 'Founding frontend member, building the vulnerability-detection experience from the ground up.',
          },
          {
            text: 'Collaborated cross-functionally with UXD and backend engineers through the full design and development cycle.',
          },
          {
            text: 'Established scalable frontend foundations: modular architecture, mock-first development, RBAC, and i18n.',
          },
          {
            highlight: 'Hubble — Enterprise BI Platform.',
            text: 'Developed and maintained a full-stack internal BI platform providing analytics across customer, product and partner domains.',
          },
          {
            text: 'Built interactive dashboards and data visualisations; developed backend APIs integrating Azure SQL and Azure Data Explorer (ADX).',
          },
        ],
      },
    ],
  },
  {
    company: 'UMIKAFFA',
    companySubtitle: '優咖智能股份有限公司',
    dates: 'August 2019 – December 2019',
    location: 'Taipei, TW',
    roles: [
      {
        title: 'Website Engineer',
        bullets: [
          { text: 'Built the official brand website end-to-end with Django and Bootstrap.' },
          { text: 'Worked directly with the director and the in-house UI designer to scope, design and ship.' },
        ],
      },
    ],
  },
  {
    company: 'Red Dot Design Award',
    companySubtitle: 'Taiwan Branch',
    dates: 'July 2018 – February 2020',
    location: 'Taipei, TW · 1 yr 8 mo',
    roles: [
      {
        title: 'CRM System Maintenance',
        bullets: [
          { text: "Processed clients' profiles and established the profile-process workflow." },
          { text: 'Maintained the company Salesforce CRM system.' },
          { text: 'Assisted submission events; wrote and sent EDM campaigns to clients.' },
        ],
      },
    ],
  },
];
