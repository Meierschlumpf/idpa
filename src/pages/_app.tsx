// src/pages/_app.tsx
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import '../styles/globals.css';
import { trpc } from '../utils/trpc';

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { ...pageProps },
}) => {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				/** Put your mantine theme override here */
				colorScheme: 'dark',
			}}
		>
			<NotificationsProvider>
				<Component {...pageProps} />
			</NotificationsProvider>
		</MantineProvider>
	);
};

export default trpc.withTRPC(MyApp);
