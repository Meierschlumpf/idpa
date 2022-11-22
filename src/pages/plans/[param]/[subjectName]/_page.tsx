import { Container, ScrollArea } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import Head from 'next/head';
import { MutableRefObject, RefObject, useEffect, useMemo } from 'react';
import { ErrorOverlay } from '../../../../components/overlays/error';
import { LoadOverlay } from '../../../../components/overlays/load';
import { NoItemsOverlay } from '../../../../components/overlays/no-items';
import { SemesterPlanList } from '../../../../components/pages/plans/[param]/list';
import { SubjectPlanAside } from '../../../../components/pages/plans/[param]/[subjectName]/aside';
import { SemesterSubjectPlanList } from '../../../../components/pages/plans/[param]/[subjectName]/list';
import { PlanSidebar } from '../../../../components/plan/sidebar';
import { PlanTitle } from '../../../../components/plan/title';
import { vacationDefinitions } from '../../../../constants/vacations';
import { BasicLayout } from '../../../../layout/basic';
import { trpc } from '../../../../utils/trpc';

interface SubjectPlanPageProps {
  semesterId: string;
  subjectName: string;
}

export const SubjectPlanPage = ({ semesterId, subjectName }: SubjectPlanPageProps) => {
  const { data: semester, ...semesterQuery } = trpc.semester.getById.useQuery({
    id: semesterId,
  });
  const { data: subject, ...subjectQuery } = trpc.subject.getByRouteName.useQuery({
    routeName: subjectName,
  });
  const { data: items, ...itemsQuery } = usePlanItems(semesterId, subject?.id);
  const vacations = useVacations(semesterId);

  const isLoading = subjectQuery.isLoading || semesterQuery.isLoading || itemsQuery.isLoading;
  const isError = subjectQuery.isError || semesterQuery.isError || itemsQuery.isError;

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
      <Head>
        <title>
          Semesterplan {subject?.name} {semester?.id} | IDPA
        </title>
      </Head>
      <BasicLayout
        sidebarContent={<PlanSidebar activeSemesterId={semesterId} activeSubjectId={subject?.id} />}
        asideContent={semester && subject && <SubjectPlanAside semester={semester.id} subjectId={subject.id} />}
      >
        <Container>
          <PlanTitle semester={semester?.id} />
          <ScrollArea
            viewportRef={scrollableRef}
            styles={{
              viewport: {
                maxHeight: 'calc(100vh - 300px)',
                width: 'calc(100% - 14px)',
              },
            }}
            mt="xl"
          >
            <LoadOverlay visible={isLoading} />
            <ErrorOverlay visible={isError} />
            <NoItemsOverlay visible={!isLoading && !isError && items?.length === 0} />
            {items && subject && <SemesterSubjectPlanList lessons={items} vacations={vacations} subject={subject} targetRef={targetRef as MutableRefObject<HTMLDivElement>} />}
          </ScrollArea>
        </Container>
      </BasicLayout>
    </>
  );
};

const usePlanItems = (semesterId: string, subjectId?: string) => {
  return trpc.planItem.getBySemesterAndSubjectId.useQuery(
    {
      semesterId,
      subjectId: subjectId ?? '',
    },
    {
      retry: false,
      enabled: !!semesterId && !!subjectId,
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
    return vacationDefinitions.filter((v) => v.end >= semester.start && v.start <= semester.end);
  }, [semester]);
};
