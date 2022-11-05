// src/pages/_app.tsx
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { MantineProvider } from '@mantine/core';

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
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
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</MantineProvider>
	);
};

export default trpc.withTRPC(MyApp);
