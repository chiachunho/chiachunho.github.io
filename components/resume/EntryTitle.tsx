import type { ReactNode } from 'react';

export default function EntryTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      className="text-foreground m-0 font-medium tracking-[-0.018em]"
      style={{ fontSize: 'clamp(18px, 1.9vw, 22px)' }}
    >
      {children}
    </h3>
  );
}
