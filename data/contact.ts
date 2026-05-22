export interface ContactLink {
  href: string;
  label: string;
  external?: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  { href: 'mailto:chiachun2491@gmail.com', label: 'chiachun2491@gmail.com' },
  { href: 'https://github.com/chiachunho', label: 'github.com/chiachunho', external: true },
  { href: 'https://www.linkedin.com/in/jefferyho-cc/', label: 'linkedin.com/in/jefferyho-cc', external: true },
  { href: 'https://blog.jefferyho.cc', label: 'blog.jefferyho.cc', external: true },
  { href: '/files/resume_240610_public.pdf', label: 'resume · PDF' },
];
