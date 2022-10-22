import { createStyles, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ReactNode } from "react";
import { useHeaderPopoverContext } from "../../../../contexts/header-popover.context";

interface DropdownSublinkProps {
	icon: ReactNode;
	label: string;
	link: string;
	description: ReactNode | string;

}


export const DropdownSublink = ({ icon, label, link, description }: DropdownSublinkProps) => {
	const { classes } = useStyles();
	const { closePopover } = useHeaderPopoverContext();

	return <UnstyledButton onClick={closePopover} component={NextLink} href={link} className={classes.subLink}>
		<Group noWrap align="flex-start">
			<ThemeIcon size={34} variant="default" radius="md">
				{icon}
			</ThemeIcon>
			<div>
				<Text size="sm" weight={500}>
					{label}
				</Text>
				<Group align='start'>
					{description}
				</Group>
			</div>
		</Group>
	</UnstyledButton>
}

const useStyles = createStyles((theme) => ({
	subLink: {
		width: '100%',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		borderRadius: theme.radius.md,

		...theme.fn.hover({
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
		}),

		'&:active': theme.activeStyles,
	},
}));