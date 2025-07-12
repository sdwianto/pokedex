// src/app/ClientRoot.tsx
'use client';

import FavoritesHydrator from '@/components/FavoritesHydrator';

import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { ReduxProvider } from '@/providers/ReduxProvider';

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <FavoritesHydrator />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
}
