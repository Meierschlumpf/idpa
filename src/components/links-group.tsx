import { Box, createStyles, Group, ThemeIcon, UnstyledButton } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { MouseEvent, ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
	control: {
		fontWeight: 500,
		display: 'block',
		width: '100%',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		fontSize: theme.fontSizes.sm,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},

	link: {
		fontWeight: 500,
		display: 'block',
		textDecoration: 'none',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		paddingLeft: 31,
		marginLeft: 30,
		fontSize: theme.fontSizes.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
			}`,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},

	chevron: {
		transition: 'transform 200ms ease',
	},
}));

interface LinksGroupProps {
	icon: ReactNode;
	label: string;
	link: string;
}

export function LinksGroup({ icon, label, link }: LinksGroupProps) {
	const { classes } = useStyles();

	return (
		<>
			<UnstyledButton component={NextLink} href={'/[subjectName]'} as={link} className={classes.control}>
				<Group position="apart" spacing={0}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<ThemeIcon variant="light" size={30}>
							{icon}
						</ThemeIcon>
						<Box ml="md" onClick={(ev: MouseEvent) => { ev.stopPropagation() }} >{label}</Box>
					</Box>
				</Group>
			</UnstyledButton>
		</>
	);
}