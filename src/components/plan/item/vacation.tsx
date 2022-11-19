import { Card, Text, Title, useMantineTheme } from '@mantine/core';
import { formatDay as formatDate } from '../../../helpers/time/format';
import { getWeekNumber } from '../../../helpers/time/get-week-number';

interface PlanVacationItemProps {
  start: Date;
  end: Date;
  name: string;
  isNext: boolean;
  isCurrent: boolean;
  showKw?: boolean;
}

export const PlanVacationItem = ({ start, end, name, isNext, isCurrent, showKw = false }: PlanVacationItemProps) => {
  const {
    colors,
    fn: { rgba },
  } = useMantineTheme();
  const difference = end.getTime() - start.getTime();
  const weekCount = Math.ceil(difference / (1000 * 60 * 60 * 24 * 7));
  return (
    <Card
      withBorder
      mt={isNext || isCurrent ? 20 : undefined}
      style={{
        background: rgba(colors.teal[5], 0.2),
        borderColor: isNext || isCurrent ? colors.teal[4] : rgba(colors.teal[4], 0.2),
        overflow: 'visible',
      }}
    >
      {isNext && (
        <Text
          style={{
            position: 'absolute',
            top: -24,
            left: 0,
            color: colors.teal[4],
          }}
        >
          {getUntilStart(start)}
        </Text>
      )}
      {isCurrent && (
        <Text
          style={{
            position: 'absolute',
            top: -24,
            left: 0,
            color: colors.teal[4],
          }}
        >
          {getUntilEnd(end)}
        </Text>
      )}
      <Title order={3}>
        {showKw && `KW ${getWeekNumber(start)} - ${getWeekNumber(end)} `}
        {`${name}ferien`}
      </Title>
      <Text>{`${formatDate(start)} bis ${formatDate(end)} (${weekCount} Woche${weekCount !== 1 ? 'n' : ''})`}</Text>
    </Card>
  );
};

const getUntilEnd = (date: Date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) + 1);
  return days === 0 ? 'Enden Heute' : days === 1 ? 'Enden Morgen' : days <= 7 ? `Enden in ${days} Tagen` : `Enden in ${Math.floor(days / 7)} Wochen`;
};

const getUntilStart = (date: Date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) - 2);
  return days === 0 ? 'Beginnen Heute' : days === 1 ? 'Beginnen Morgen' : days <= 7 ? `Beginnen in ${days} Tagen` : `Beginnen in ${Math.floor(days / 7)} Wochen`;
};
