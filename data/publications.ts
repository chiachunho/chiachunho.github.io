export interface Publication {
  title: string;
  meta: string;
  tags: string;
  description: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    title: 'Leveraging Supplementary Information for Multi-Modal Fake News Detection',
    meta: "2023 · Master's thesis",
    tags: 'Multi-modal attention',
    description:
      'Image-captioning generates supplementary text for news images; multi-head attention learns inter-dependencies across modalities. Outperforms state-of-the-art baselines on three real-world datasets.',
  },
  {
    title: 'A Greedy Algorithm for Budgeted Multiple-Product Profit Maximization in Social Network',
    meta: 'Conference paper',
    tags: 'Social network analysis · Algorithms',
    description:
      'Co-authored work on a budget-aware greedy algorithm for maximising profit when seeding multiple products simultaneously through a social network.',
  },
];
