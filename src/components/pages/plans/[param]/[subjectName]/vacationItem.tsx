import { Stack, Title } from '@mantine/core';
import { getWeekNumber } from '../../../../../helpers/time/get-week-number';
import { PlanVacationItem } from '../../../../plan/item/vacation';

interface PlanSubjectWeekVacationItemProps {
  start: Date;
  end: Date;
  name: string;
  isNext: boolean;
  isCurrent: boolean;
}
export const PlanSubjectWeekVacationItem = (props: PlanSubjectWeekVacationItemProps) => {
  return <PlanVacationItem {...props} showKw />;
};
