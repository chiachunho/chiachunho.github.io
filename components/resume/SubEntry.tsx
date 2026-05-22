import type { ReactNode } from 'react';

export default function SubEntry({ children }: { children: ReactNode }) {
  return (
    <div className="text-body mt-1" style={{ fontSize: 'clamp(16px,1.7vw,18px)' }}>
      {children}
    </div>
  );
}
