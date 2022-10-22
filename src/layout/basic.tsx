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
	sidebarContent?: ReactNode;
}

export const BasicLayout = ({ children, sidebarContent }: BasicLayoutProps) => {
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
			navbar={sidebarContent ? <BasicNavbar opened={navbarOpened}>{sidebarContent}</BasicNavbar> : undefined}
			footer={<BasicFooter />}
			header={<BasicHeader navbarOpened={navbarOpened} toggleNavbar={toggleNavbar} />}
		>
			{children}
		</AppShell>
	);
}