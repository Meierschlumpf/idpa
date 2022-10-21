import {
	Box, Button, Group, Header, Text
} from '@mantine/core';
import { IconSchool } from '@tabler/icons';
import { signIn } from 'next-auth/react';
import { HeaderDropdown } from './header/dropdown';
import { HeaderLink } from './header/link';

interface BasicHeaderProps {
	navbarOpened: boolean;
	toggleNavbar: () => void;
}

export const BasicHeader = ({ navbarOpened, toggleNavbar }: BasicHeaderProps) => {
	return (
		<Box pb={60}>
			<Header height={60} px="md">
				<Group position="apart" sx={{ height: '100%' }}>
					<Group>
						<IconSchool size={30} />
						<Text weight={500} size={30}>IDPA</Text>
					</Group>

					<Group sx={{ height: '100%' }} spacing={0}>
						<HeaderLink label='Startseite' href='#' />
						<HeaderDropdown label="Semesterplan" href="#" footer={<div></div>} />
					</Group>

					<Group>
						<Button variant="default" onClick={() => signIn('github')}>Log in</Button>
					</Group>
				</Group>
			</Header>
		</Box>
	)
}