import { Card, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { formatDay } from '../../../helpers/time/format';
import { getWeekNumber } from '../../../helpers/time/get-week-number';

interface PlanHolidayItemProps {
  start: Date;
  end: Date;
  name: string;
  showKw?: boolean;
}

export const PlanHolidayItem = ({ start, end, name, showKw }: PlanHolidayItemProps) => {
  const {
    colors,
    fn: { rgba },
  } = useMantineTheme();

  return (
    <Card
      withBorder
      style={{
        background: rgba(colors.blue[5], 0.2),
        borderColor: rgba(colors.blue[4], 0.2),
        overflow: 'visible',
      }}
    >
      <Stack>
        <Title order={3}>
          {showKw && `KW ${getWeekNumber(start)} - `}
          {name}
        </Title>
        {start.getTime() === end.getTime() ? <Text>{`${formatDay(start)}`}</Text> : <Text>{`${formatDay(start)} bis ${formatDay(end)}`}</Text>}
      </Stack>
    </Card>
  );
};
