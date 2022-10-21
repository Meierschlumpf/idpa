import { createStyles, Group, Stack, Text, ThemeIcon, UnstyledButton, useMantineTheme } from "@mantine/core"
import { NextLink } from "@mantine/next";
import { TablerIconComponent } from "../../../../components/tablerIcon";

interface DropdownSublinkProps {
	item: {
		id: string;
		name: string;
		routeName: string;
		icon: string;
		class: {
			id: string;
			name: string;
		}
		lessons: {
			id: string;
			start: Date;
			end: Date;
			day: number;
		}[];
	};
	closePopover: () => void;
}

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

export const DropdownSublink = ({ item, closePopover }: DropdownSublinkProps) => {
	const { classes } = useStyles();
	const theme = useMantineTheme();

	return <UnstyledButton onClick={closePopover} component={NextLink} href={`/plans/${item.class.name.toLowerCase()}/${item.routeName}`} className={classes.subLink} key={item.id}>
		<Group noWrap align="flex-start">
			<ThemeIcon size={34} variant="default" radius="md">
				<TablerIconComponent name={item.icon} size={22} color={theme.fn.primaryColor()} />
			</ThemeIcon>
			<div>
				<Text size="sm" weight={500}>
					{item.name}
				</Text>
				<Group align='start'>
					<Text size="xs" color="dimmed" weight={700}>{days[(item.lessons.at(0)?.day ?? 1) - 1]}</Text>
					<Stack spacing={2}>
						{item.lessons.map(l => <Text size="xs" color="dimmed" key={l.id}>
							{`${formatTime(l.start)} - ${formatTime(l.end)}`}
						</Text>)}
					</Stack>
				</Group>
			</div>
		</Group>
	</UnstyledButton>
}

const formatTime = (date: Date) => {
	const hours = date.getHours();
	const hoursString = hours <= 9 ? `0${hours}` : hours.toString();
	const minutes = date.getMinutes();
	const minutesString = minutes <= 9 ? `0${minutes}` : minutes.toString();
	return `${hoursString}:${minutesString}`;
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