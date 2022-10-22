import { Anchor, createStyles, Divider, Group, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";

interface HeaderDropdownWrapperProps {
	title: string;
	href: string;
	children: ReactNode;
	footer: ReactNode;
}

export const HeaderDropdownWrapper = ({ title, href, children, footer }: HeaderDropdownWrapperProps) => {
	const { classes } = useStyles();
	const theme = useMantineTheme();

	return <>
		<Group position="apart" px="md">
			<Text weight={500}>{title}</Text>
			<Anchor href={href} size="xs">
				View all
			</Anchor>
		</Group>

		<Divider
			my="sm"
			mx="-md"
			color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
		/>

		<SimpleGrid cols={2} spacing={0}>
			{children}
		</SimpleGrid>

		<div className={classes.dropdownFooter}>
			{footer}
		</div></>
}

const useStyles = createStyles((theme) => ({
	dropdownFooter: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
		margin: -theme.spacing.md,
		marginTop: theme.spacing.sm,
		padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
		paddingBottom: theme.spacing.xl,
		borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
			}`,
	},
}));