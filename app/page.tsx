// app/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{decodeURIComponent(error)}</p>}
      <h1>Welcome</h1>
      {/* Your homepage content */}
    </div>
  );
}