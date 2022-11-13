import { Container, ScrollArea } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useEffect, useMemo } from 'react';
import { ErrorOverlay } from '../../../components/overlays/error';
import { LoadOverlay } from '../../../components/overlays/load';
import { NoItemsOverlay } from '../../../components/overlays/no-items';
import { PlanAside } from '../../../components/pages/plans/[param]/aside';
import { SemesterPlanList } from '../../../components/pages/plans/[param]/list';
import { PlanTitle } from '../../../components/plan/title';
import { vacationDefinitions } from '../../../constants/vacations';
import { BasicLayout } from '../../../layout/basic';
import { trpc } from '../../../utils/trpc';

interface PlanPageProps {
  semesterId: string;
}

export const PlanPage = ({ semesterId }: PlanPageProps) => {
  const { data: items, isLoading, isError } = usePlanItems(semesterId);
  const vacations = useVacations(semesterId);
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    duration: 100,
  });

  useEffect(() => {
    if (isLoading || isError) return;
    scrollIntoView();
  }, [scrollIntoView, isLoading, isError]);

  return (
    <>
      <BasicLayout asideContent={<PlanAside semester={semesterId} />}>
        <Container>
          <PlanTitle semester={semesterId} />
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
            {items && items.length !== 0 && <SemesterPlanList lessons={items} vacations={vacations} />}
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

const useVacations = (semesterId: string) => {
  const { data: semester } = trpc.semester.getById.useQuery(
    {
      id: semesterId,
    },
    { retry: false }
  );
  return useMemo(() => {
    if (!semester) return [];
    // TODO: bitte beachten, dass Ferien erst am Montag darauf anfangen!
    return vacationDefinitions.filter((v) => v.end >= semester.start && v.start <= semester.end);
  }, [semester]);
};