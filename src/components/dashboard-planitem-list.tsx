import { Card, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { formatDay } from '../helpers/time/format';
import { getWeekNumber } from '../helpers/time/get-week-number';
import { getNextDate } from '../helpers/time/next-date';
import { useAuthStore } from '../stores/auth-store';
import { trpc } from '../utils/trpc';
import { ReducedSortableLesson } from './pages/plans/[param]/list';
import { PlanItemTasks } from './pages/plans/[param]/tasks';
import { BadgeList } from './plan/item/badge/list';
import { ItemDescription } from './plan/item/description';
import { TablerIconComponent } from './tablerIcon';
import { EditPlanItemTasks } from './pages/plans/[param]/edit/tasks';
import { PlanItemEditMenu } from './plan/item/edit-menu';

interface DashboardPlanItemListProps {}

export const DashboardPlanItemList = ({}: DashboardPlanItemListProps) => {
  const { data: subjects } = trpc.subject.getAll.useQuery();
  const { data: items, isLoading, isError } = usePlanItems();
  const role = useAuthStore((x) => x.role);
  const theme = useMantineTheme();

  const reducedItems = items?.reduce((prev, curr) => {
    const itemYear = curr.date.getFullYear();
    const itemWeek = getWeekNumber(curr.date);
    const index = prev.findIndex((x) => x.year == itemYear && x.week == itemWeek);
    if (index !== -1) {
      prev[index]!.items.push(curr);
      return prev;
    }
    prev.push({
      type: 'week',
      week: itemWeek,
      year: itemYear,
      items: [curr],
      sortBy: curr.date,
    });
    return prev;
  }, [] as ReducedSortableLesson[]);
  return (
    <Stack>
      {reducedItems?.map((item, outerIndex) => (
        <Stack mt={outerIndex === 0 ? 0 : 'lg'} spacing="sm">
          <Title order={4}>KW {item.week}</Title>
          {item.items.map((item, index) => {
            const subject = subjects?.find((s) => s.id === item.subjectId);

            return (
              <Card
                mt={20}
                style={{
                  overflow: 'visible',
                }}
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
              >
                <Group
                  spacing={4}
                  style={{
                    position: 'absolute',
                    top: -24,
                    left: 0,
                  }}
                >
                  <Text>{formatDay(item.date)}</Text>
                </Group>
                <Stack>
                  <Group position="apart" align="center">
                    <Title order={3}>{item.title}</Title>

                    <Group align="center">
                      <TablerIconComponent name={subject?.icon} />
                      <Title order={4}>{subject?.name}</Title>
                      {role === 'teacher' ? <PlanItemEditMenu item={item} planId="" /> : null}
                    </Group>
                  </Group>
                  {item.description && (
                    <Group>
                      <ItemDescription description={item.description} />
                    </Group>
                  )}
                  <Group position={item.badges.length === 0 ? 'right' : 'apart'}>
                    <BadgeList mode="read" activeBadges={item.badges} handleSwitch={() => {}} handleAddition={() => {}} handleRemoval={() => {}} />
                    {role === 'student' ? <PlanItemTasks planItem={item} /> : <EditPlanItemTasks planId="" planItem={item} />}
                  </Group>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      ))}
    </Stack>
  );
};

const usePlanItems = () => {
  return trpc.planItem.getNext.useQuery(undefined, {
    retry: false,
  });
};
