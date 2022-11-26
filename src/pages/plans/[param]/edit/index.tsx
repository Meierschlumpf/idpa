import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { useDisclosure, useScrollIntoView } from '@mantine/hooks';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { EditPlanAside } from '../../../../components/pages/plans/[param]/edit/aside';
import { CreateMaterialModal } from '../../../../components/pages/plans/[param]/edit/create-material';
import { CreateThemeModal } from '../../../../components/pages/plans/[param]/edit/create-theme';
import { PlanEditList } from '../../../../components/pages/plans/[param]/edit/list';
import { SubjectPlanAside } from '../../../../components/pages/plans/[param]/[subjectName]/aside';
import { TablerIconComponent } from '../../../../components/tablerIcon';
import { BasicLayout } from '../../../../layout/basic';
import { Page404 } from '../../../../layout/errors/404';
import { useAuthStore } from '../../../../stores/auth-store';
import { trpc } from '../../../../utils/trpc';

const Page: NextPage = () => {
  const { id } = useRouterParams();
  const { data: plan, isError } = trpc.plan.getById.useQuery({ id }, { enabled: !!id });
  const { data: items, ...itemsQuery } = trpc.planItem.getByPlanId.useQuery({ planId: id }, { enabled: !!id });
  const [newThemeModalOpened, newThemeModal] = useDisclosure(false);
  const role = useAuthStore((x) => x.role);
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    duration: 500,
    cancelable: false,
  });

  if (isError || itemsQuery.isError || role === 'student') {
    return <Page404 />;
  }

  return (
    <>
      <Head>
        <title>Semesterplan bearbeiten | IDPA</title>
      </Head>
      <BasicLayout asideContent={plan && <EditPlanAside planId={plan.id} />}>
        <Container>
          <Group position="apart" align="center">
            <Group>
              <TablerIconComponent size={40} name={plan?.subject?.icon} />
              <Stack spacing={4}>
                <Title order={3}>Semesterplan bearbeiten</Title>
                <Text weight={500}>
                  {plan?.subject?.name} - {plan?.semesterId}
                </Text>
              </Stack>
            </Group>

            <Group align="center">
              <Button variant="subtle" color="gray" onClick={() => scrollIntoView({ alignment: 'center' })}>
                Nächster Termin
              </Button>
              <Button onClick={newThemeModal.open}>Neues Thema</Button>
              <CreateThemeModal opened={newThemeModalOpened} closeModal={newThemeModal.close} items={items} plan={plan as any} />
            </Group>
          </Group>
          <Group></Group>

          {plan && <PlanEditList targetRef={targetRef} scrollableRef={scrollableRef} plan={plan} />}
        </Container>
      </BasicLayout>
    </>
  );
};

export default Page;

const useRouterParams = () => {
  const router = useRouter();
  return {
    id: router.query.param as string,
  };
};
