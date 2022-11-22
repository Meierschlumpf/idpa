import { Button, Container, Grid, Group, Stack, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import Head from 'next/head';
import { PlanDashboardItem } from '../../components/plan-dashboard-item';
import { BasicLayout } from '../../layout/basic';
import { useAuthStore } from '../../stores/auth-store';
import { AppRouterTypes, trpc } from '../../utils/trpc';

type ResultType = { semester: string; items: Exclude<AppRouterTypes['plan']['getAll']['output'], undefined> }[];

const PlansPage = () => {
  const { data: semesters } = trpc.plan.getAll.useQuery(undefined, {
    select(plans) {
      return plans?.reduce((prev: ResultType, curr) => {
        const foundIndex = prev.findIndex((x) => x.semester === curr.semesterId);
        if (foundIndex !== -1) {
          prev[foundIndex]!.items.push(curr);
          return prev;
        }
        prev.push({ semester: curr.semesterId, items: [curr] });
        return prev;
      }, []);
    },
  });
  const role = useAuthStore((x) => x.role);

  return (
    <>
      <Head>
        <title>Semesterpläne | IDPA</title>
      </Head>
      <BasicLayout>
        <Container>
          <Group position="apart">
            <Title order={2}>Semesterpläne</Title>
            {role === 'teacher' ? (
              <Button component={NextLink} href="/plans/create">
                Semesterplan erstellen
              </Button>
            ) : null}
          </Group>
          {semesters?.map(({ semester, items }) => (
            <Stack key={semester} mt="md">
              <Title order={4}>{semester}</Title>
              <Grid>
                {role === 'student' ? (
                  <Grid.Col span={4}>
                    <PlanDashboardItem
                      plan={{ subject: { name: 'Übersicht', icon: 'AlignLeft', routeName: '' }, semesterId: semester } as any}
                      showSemester={false}
                      current={items.at(0)!.semester.start <= new Date() && items.at(0)!.semester.end > new Date()}
                    />
                  </Grid.Col>
                ) : null}
                {items.map((p) => (
                  <Grid.Col span={4} key={p.id}>
                    <PlanDashboardItem plan={p} showSemester={false} current={items.at(0)!.semester.start <= new Date() && items.at(0)!.semester.end > new Date()} />
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          ))}
        </Container>
      </BasicLayout>
    </>
  );
};

export default PlansPage;
