// src/pages/_app.tsx
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { useEffect } from 'react';
import { LoadOverlay } from '../components/overlays/load';
import { useAuthStore } from '../stores/auth-store';
import '../styles/globals.css';
import { trpc } from '../utils/trpc';

const colorScheme = 'dark';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { ...pageProps } }) => {
  const { data: role, isLoading } = trpc.activeRole.current.useQuery();
  const setRole = useAuthStore((x) => x.setRole);

  useEffect(() => {
    if (!role) return;
    setRole(role.name);
  }, [role]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme,
      }}
    >
      <NotificationsProvider>
        <LoadOverlay visible={isLoading} />
        {!isLoading && <Component {...pageProps} />}
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default trpc.withTRPC(MyApp);
