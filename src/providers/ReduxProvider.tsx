// src/providers/ReduxProvider.tsx
'use client';
import { Provider } from 'react-redux';

import { store } from '@/store/clientStore';

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
