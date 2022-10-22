import { Stack, Text, useMantineTheme } from "@mantine/core";
import { TablerIconComponent } from "../../../../components/tablerIcon";
import { formatTime } from "../../../../helpers/time/format";
import { trpc } from "../../../../utils/trpc";
import { HeaderDropdown } from "../dropdown"
import { DropdownSublink } from "../dropdown/sublink";
import { HeaderLink } from "../link"

export const StudentHeaderNavigation = () => {
	const theme = useMantineTheme();
	const { data } = trpc.subject.getHoverCard.useQuery();

	return <>
		<HeaderLink label='Startseite' href='#' />
		<HeaderDropdown label="Semesterplan" href="#" footer={<div></div>}>
			{data?.map(item =>
				<DropdownSublink
					key={item.id}
					label={item.name}
					link={`/plans/${item.class.name.toLowerCase()}/${item.routeName}`}
					icon={<TablerIconComponent
						name={item.icon}
						size={22}
						color={theme.fn.primaryColor()}
					/>}
					description={<><Text size="xs" color="dimmed" weight={700}>{days[(item.lessons.at(0)?.day ?? 1) - 1]}</Text>
						<Stack spacing={2}>
							{item.lessons.map(l => <Text size="xs" color="dimmed" key={l.id}>
								{`${formatTime(l.start)} - ${formatTime(l.end)}`}
							</Text>)}
						</Stack></>}
				/>
			)}
		</HeaderDropdown>
	</>
};

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
