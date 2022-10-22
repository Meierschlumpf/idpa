import { Box, Center, createStyles, Popover, UnstyledButton, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { IconChevronDown } from "@tabler/icons";
import { ReactNode } from "react";
import { HeaderPopoverProvider } from "../../../contexts/header-popover.context";
import { useDelayedHover } from "../../../hooks/use-delayed-hover";
import { HeaderDropdownWrapper } from "./dropdown/wrapper";

interface HeaderDropdownProps {
	label: string;
	href: string;
	footer: ReactNode;
	children: ReactNode;
}

export const HeaderDropdown = ({ label, href, footer, children }: HeaderDropdownProps) => {
	const { classes } = useStyles();
	const theme = useMantineTheme();

	const [opened, { open, close }] = useDisclosure(false);
	const { openDropdown, closeDropdown } = useDelayedHover({ open, close, openDelay: 0, closeDelay: 150 });

	return <Popover width={600} position="bottom" radius="md" shadow="md" withinPortal opened={opened} onChange={() => { }}>
		<Popover.Target>
			<UnstyledButton onMouseEnter={openDropdown} onMouseLeave={closeDropdown} component={NextLink} href={href} className={classes.link}>
				<Center inline>
					<Box component="span" mr={5}>
						{label}
					</Box>
					<IconChevronDown size={16} color={theme.fn.primaryColor()} />
				</Center>
			</UnstyledButton>
		</Popover.Target>

		<Popover.Dropdown onMouseEnter={openDropdown} onMouseLeave={closeDropdown} sx={{ overflow: 'hidden' }}>
			<HeaderDropdownWrapper title={label} href={href} footer={footer}>
				<HeaderPopoverProvider closePopover={close}>
					{children}
				</HeaderPopoverProvider>
			</HeaderDropdownWrapper>

		</Popover.Dropdown>
	</Popover>
}

const useStyles = createStyles((theme) => ({
	link: {
		display: 'flex',
		alignItems: 'center',
		height: '100%',
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontWeight: 500,
		fontSize: theme.fontSizes.sm,

		[theme.fn.smallerThan('sm')]: {
			height: 42,
			display: 'flex',
			alignItems: 'center',
			width: '100%',
		},

		...theme.fn.hover({
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		}),
	}
}));

/*
<Group position="apart" px="md">
			<Text weight={500}>Features</Text>
			<Anchor href="#" size="xs">
				View all
			</Anchor>
		</Group>

		<Divider
			my="sm"
			mx="-md"
			color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
		/>

		<SimpleGrid cols={2} spacing={0}>
			{links}
		</SimpleGrid>

		<div className={classes.dropdownFooter}>
			<Group position="apart">
				<div>
					<Text weight={500} size="sm">
						Get started
					</Text>
					<Text size="xs" color="dimmed">
						Their food sources have decreased, and their numbers
					</Text>
				</div>
				<Button variant="default">Get started</Button>
			</Group>
		</div>
		*/