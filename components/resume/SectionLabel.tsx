import type { ReactNode } from 'react';

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="border-border text-foreground mb-7 border-b pb-4 text-[12px] font-medium tracking-[0.01em]">
      {children}
    </div>
  );
}
