import { Button, Container, Group, ScrollArea } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { RefObject, useEffect, useMemo } from 'react';
import { ErrorOverlay } from '../../../components/overlays/error';
import { LoadOverlay } from '../../../components/overlays/load';
import { NoItemsOverlay } from '../../../components/overlays/no-items';
import { PlanAside } from '../../../components/pages/plans/[param]/aside';
import { SemesterPlanList } from '../../../components/pages/plans/[param]/list';
import { PlanSidebar } from '../../../components/plan/sidebar';
import { PlanTitle } from '../../../components/plan/title';
import { freeDaysDefinition, vacationDefinitions } from '../../../constants/vacations';
import { BasicLayout } from '../../../layout/basic';
import { trpc } from '../../../utils/trpc';

interface PlanPageProps {
  semesterId: string;
}

export const PlanPage = ({ semesterId }: PlanPageProps) => {
  const { data: items, isLoading, isError } = usePlanItems(semesterId);
  const { vacations, freeDays } = useFreeDaysAndVacations(semesterId);
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    duration: 100,
    cancelable: false,
  });

  useEffect(() => {
    if (isLoading || isError) return;
    scrollIntoView({ alignment: 'center' });
  }, [scrollIntoView, isLoading, isError]);

  return (
    <>
      <BasicLayout sidebarContent={<PlanSidebar activeSemesterId={semesterId} />} asideContent={<PlanAside semester={semesterId} />}>
        <Container>
          <Group position="apart" align="center">
            <PlanTitle semester={semesterId} />

            <Button variant="subtle" color="gray" onClick={() => scrollIntoView({ alignment: 'center' })}>
              Nächster Termin
            </Button>
          </Group>
          <ScrollArea
            styles={{
              viewport: {
                maxHeight: 'calc(100vh - 300px)',
                width: 'calc(100% - 14px)',
              },
            }}
            mt="xl"
            viewportRef={scrollableRef}
          >
            <LoadOverlay visible={isLoading} />
            <ErrorOverlay visible={isError} />
            <NoItemsOverlay visible={!isLoading && !isError && items?.length === 0} />
            {items && items.length !== 0 && <SemesterPlanList targetRef={targetRef as RefObject<HTMLDivElement>} lessons={items} vacations={vacations} freeDays={freeDays} />}
          </ScrollArea>
        </Container>
      </BasicLayout>
    </>
  );
};

const usePlanItems = (semesterId: string) => {
  return trpc.planItem.getBySemesterId.useQuery(
    {
      semesterId: semesterId,
    },
    {
      retry: false,
      enabled: !!semesterId,
    }
  );
};

const useFreeDaysAndVacations = (semesterId: string) => {
  const { data: semester } = trpc.semester.getById.useQuery(
    {
      id: semesterId,
    },
    { retry: false }
  );
  const vacations = useMemo(() => {
    if (!semester) return [];
    return vacationDefinitions.filter((v) => v.end >= semester.start && v.start <= semester.end);
  }, [semester]);
  const freeDays = useMemo(() => {
    if (!semester) return [];
    return freeDaysDefinition.filter((v) => v.end >= semester.start && v.start <= semester.end);
  }, [semester]);
  return {
    vacations,
    freeDays,
  };
};
