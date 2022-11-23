import { Title } from '@mantine/core';
import { getWeekNumber } from '../../../helpers/time/get-week-number';

interface PlanLessonItemTitleProps {
  showKw?: boolean;
  date: Date;
  theme: string | null;
}

export const PlanLessonItemTitle = ({ showKw = true, date, theme }: PlanLessonItemTitleProps) => {
  const week = getWeekNumber(date);

  if (!showKw) return <Title order={3}>{theme ?? 'Undefiniert'}</Title>;

  return <Title order={3}>{`KW ${week} - ${theme ?? 'Undefiniert'}`}</Title>;
};
