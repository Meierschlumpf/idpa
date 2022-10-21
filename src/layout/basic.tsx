import {
	AppShell, useMantineTheme
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { ReactNode } from 'react';
import { BasicFooter } from './basic/footer';
import { BasicHeader } from './basic/header';
import { BasicNavbar } from './basic/navbar';

interface BasicLayoutProps {
	children: ReactNode;
}

export const BasicLayout = ({ children }: BasicLayoutProps) => {
	const theme = useMantineTheme();
	const [navbarOpened, toggleNavbar] = useToggle();

	return (
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			navbar={<BasicNavbar opened={navbarOpened} />}
			footer={<BasicFooter />}
			header={<BasicHeader navbarOpened={navbarOpened} toggleNavbar={toggleNavbar} />}
		>
			{children}
		</AppShell>
	);
}