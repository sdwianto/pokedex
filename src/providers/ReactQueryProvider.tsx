//src/providers/ReactQueryProvider.tsx

'use  client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={queryClient}>
    {children} <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
);
