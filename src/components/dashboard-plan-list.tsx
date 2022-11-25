import { Grid, Skeleton, Title } from '@mantine/core';
import { getGreeting } from '../helpers/time/greeting';
import { useAuthStore } from '../stores/auth-store';
import { trpc } from '../utils/trpc';
import { AddPlanDashboardItem } from './add-plan-dashboard-item';
import { ErrorOverlay } from './overlays/error';
import { LoadOverlay } from './overlays/load';
import { PlanDashboardItem } from './plan-dashboard-item';

export const DashboardPlanList = () => {
  const role = useAuthStore((x) => x.role);
  const { data: plans, isLoading, isError } = trpc.plan.getForDashboard.useQuery();
  const greeting = getGreeting();

  return (
    <>
      <Title order={2}>Guten {greeting}</Title>
      {isLoading && (
        <Grid>
          {Array.from(new Array(6)).map((_, i) => (
            <Grid.Col key={i} span={12} xs={6} md={4} style={{ height: 95 }}>
              <Skeleton height="100%" width="100%" radius="md" />
            </Grid.Col>
          ))}
        </Grid>
      )}
      <ErrorOverlay visible={isError} />
      {!isLoading && !isError && (
        <Grid>
          {plans?.slice(0, role === 'student' ? 6 : 5).map((p) => (
            <Grid.Col key={p.id} span={12} sm={6} md={4} style={{ height: 95 }}>
              <PlanDashboardItem plan={p} />
            </Grid.Col>
          ))}
          {role === 'teacher' ? (
            <Grid.Col span={12} sm={6} md={4} style={{ height: 95 }}>
              <AddPlanDashboardItem />
            </Grid.Col>
          ) : null}
        </Grid>
      )}
    </>
  );
};
