export interface EducationEntry {
  school: string;
  dates: string;
  location: string;
  degree: string;
  thesis?: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    school: 'National Taiwan University of Science and Technology',
    dates: 'February 2021 – July 2023',
    location: 'Taipei, TW',
    degree: 'M.S. in Computer Science',
    thesis: 'Thesis: Leveraging Supplementary Information for Multi-Modal Fake News Detection.',
  },
  {
    school: 'National Taiwan University of Science and Technology',
    dates: 'September 2017 – January 2021',
    location: 'Taipei, TW',
    degree: 'B.S. in Computer Science',
  },
];
