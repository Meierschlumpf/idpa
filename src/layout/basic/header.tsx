import {
	Box, Group, Header, Text
} from '@mantine/core';
import { IconSchool } from '@tabler/icons';
import { trpc } from '../../utils/trpc';
import { UserLoginButton } from './header/user/login';
import { UserProfileButton } from './header/user/profile';
import { AdminHeaderNavigation } from './header/variant/admin';
import { StudentHeaderNavigation } from './header/variant/student';
import { TeacherHeaderNavigation } from './header/variant/teacher';

interface BasicHeaderProps {
	navbarOpened: boolean;
	toggleNavbar: () => void;
}

export const BasicHeader = ({ navbarOpened, toggleNavbar }: BasicHeaderProps) => {
	const { data } = trpc.auth.getSession.useQuery();

	return (
		<Box pb={60}>
			<Header height={60} px="md">
				<Group position="apart" sx={{ height: '100%' }}>
					<Group>
						<IconSchool size={30} />
						<Text weight={500} size={30}>IDPA</Text>
					</Group>

					<Group sx={{ height: '100%' }} spacing={0}>
						{data?.user?.role === 'admin' ? <AdminHeaderNavigation /> : data?.user?.role === 'student' ? <StudentHeaderNavigation /> : <TeacherHeaderNavigation />}
					</Group>

					<Group>
						{data?.user ? <UserProfileButton user={data.user} /> : <UserLoginButton />}
					</Group>
				</Group>
			</Header>
		</Box>
	)
}