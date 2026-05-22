export interface SkillGroup {
  heading: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    heading: 'Frontend Development',
    items: ['React.js / Next.js', 'TypeScript / JavaScript', 'Redux', 'Highcharts.js', 'Tailwind CSS', 'Vite'],
  },
  {
    heading: 'Backend & Data',
    items: ['ASP.NET Core · C#', 'Django · DRF', 'Python', 'Azure SQL', 'Azure Data Explorer', 'REST API design'],
  },
  {
    heading: 'Research & Tools',
    items: ['Git · GitHub', 'C / C++'],
  },
];
