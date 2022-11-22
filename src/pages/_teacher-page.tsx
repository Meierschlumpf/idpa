import { Stack } from '@mantine/core';
import { DashboardPlanList } from '../components/dashboard-plan-list';
import { DashboardPlanItemList } from '../components/dashboard-planitem-list';
import { trpc } from '../utils/trpc';

export const TeacherHomePage = () => {
  const { data: items, isLoading, isError } = usePlanItems();

  return (
    <Stack>
      <DashboardPlanList />
      <DashboardPlanItemList />
    </Stack>
  );
};

const usePlanItems = () => {
  return trpc.planItem.getNext.useQuery(undefined, {
    retry: false,
  });
};
