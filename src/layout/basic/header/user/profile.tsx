import { Avatar, createStyles, Group, Menu, Text, UnstyledButton } from "@mantine/core"
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface UserProfileButtonProps {
	user: { id: string, name?: string | null, image?: string | null }
}

export const UserProfileButton = ({ user }: UserProfileButtonProps) => {
	const { classes, cx } = useStyles();
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	return <Menu
		width={260}
		position="bottom-end"
		transition="pop-top-right"
		onClose={() => setUserMenuOpened(false)}
		onOpen={() => setUserMenuOpened(true)}
	>
		<Menu.Target>
			<UnstyledButton
				className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
			>
				<Group spacing={7}>
					<Avatar src={user.image} alt={user.name ?? 'profile image'} radius="xl" size={20} />
					<Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
						{user.name}
					</Text>
					<IconChevronDown size={12} stroke={1.5} />
				</Group>
			</UnstyledButton>
		</Menu.Target>
		<Menu.Dropdown>
			<Menu.Label>Settings</Menu.Label>
			<Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
			<Menu.Item icon={<IconLogout size={14} stroke={1.5} />} onClick={() => signOut()}>Logout</Menu.Item>
		</Menu.Dropdown>
	</Menu>

}

const useStyles = createStyles((theme) => ({
	header: {
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
			}`,
		marginBottom: 120,
	},

	mainSection: {
		paddingBottom: theme.spacing.sm,
	},

	user: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
		},

		[theme.fn.smallerThan('xs')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('xs')]: {
			display: 'none',
		},
	},

	userActive: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},

	tabs: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	tabsList: {
		borderBottom: '0 !important',
	},

	tab: {
		fontWeight: 500,
		height: 38,
		backgroundColor: 'transparent',

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
		},

		'&[data-active]': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
			borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
		},
	},
}));