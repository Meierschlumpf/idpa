import { Stack, Title } from '@mantine/core';
import { getWeekNumber } from '../../../../helpers/time/get-week-number';
import { PlanVacationItem } from '../../../plan/item/vacation';

interface PlanWeekVacationItemProps {
	start: Date;
	end: Date;
	name: string;
	isNext: boolean;
	isCurrent: boolean;
}
export const PlanWeekVacationItem = (props: PlanWeekVacationItemProps) => {
	return (
		<Stack mt='lg' spacing='sm'>
			<Title order={3}>
				KW {getWeekNumber(props.start)} - {getWeekNumber(props.end)}
			</Title>
			<PlanVacationItem {...props} />
		</Stack>
	);
};
