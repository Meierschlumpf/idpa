import { Grid, Title } from '@mantine/core';
import { getGreeting } from '../helpers/time/greeting';
import { useAuthStore } from '../stores/auth-store';
import { trpc } from '../utils/trpc';
import { AddPlanDashboardItem } from './add-plan-dashboard-item';
import { PlanDashboardItem } from './plan-dashboard-item';

export const DashboardPlanList = () => {
  const role = useAuthStore((x) => x.role);
  const { data: plans } = trpc.plan.getForDashboard.useQuery();
  const greeting = getGreeting();

  return (
    <>
      <Title order={2}>Guten {greeting}</Title>

      <Grid>
        {plans?.slice(0, role === 'student' ? 6 : 5).map((p) => (
          <Grid.Col key={p.id} span={4} style={{ height: 95 }}>
            <PlanDashboardItem plan={p} />
          </Grid.Col>
        ))}
        {role === 'teacher' ? (
          <Grid.Col span={4} style={{ height: 95 }}>
            <AddPlanDashboardItem />
          </Grid.Col>
        ) : null}
      </Grid>
    </>
  );
};
