import {
	AppShell, Aside, useMantineTheme
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { ReactNode } from 'react';
import { BasicAside } from './basic/aside';
import { BasicFooter } from './basic/footer';
import { BasicHeader } from './basic/header';
import { BasicNavbar } from './basic/navbar';

interface BasicLayoutProps {
	children: ReactNode;
	sidebarContent?: ReactNode;
	asideContent?: ReactNode;
}

export const BasicLayout = ({ children, sidebarContent, asideContent }: BasicLayoutProps) => {
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
			aside={asideContent ? <BasicAside>{asideContent}</BasicAside> : undefined}
		>
			{children}
		</AppShell>
	);
}