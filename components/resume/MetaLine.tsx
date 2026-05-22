import type { ReactNode } from 'react';

export default function MetaLine({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <div className="text-muted-foreground text-[14px]" style={{ marginTop: first ? '12px' : '4px' }}>
      {children}
    </div>
  );
}
