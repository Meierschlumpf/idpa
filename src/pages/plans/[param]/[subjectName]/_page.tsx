import { Box, Container, Group, NavLink, ScrollArea, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { Icon123, IconBooks, IconExternalLink } from '@tabler/icons';
import { ErrorOverlay } from '../../../../components/overlays/error';
import { LoadOverlay } from '../../../../components/overlays/load';
import { NoItemsOverlay } from '../../../../components/overlays/no-items';
import { SubjectPlanAside } from '../../../../components/pages/plans/[param]/[subjectName]/aside';
import { PlanTitle } from '../../../../components/plan/title';
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

  const isLoading = subjectQuery.isLoading || semesterQuery.isLoading;
  const isError = subjectQuery.isError || semesterQuery.isError;

  return (
    <>
      <BasicLayout asideContent={semester && subject && <SubjectPlanAside semester={semester.id} subjectId={subject.id} />}>
        <Container>
          <PlanTitle semester={semester?.id} />
          <ScrollArea
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
            <NoItemsOverlay visible={!isLoading && !isError /*&& items?.length === 0*/} />
            {/*{items && (
							<SemesterSubjectPlanList
								lessons={items}
								vacations={vacations}
								subject={subject}
							/>
						)}*/}
          </ScrollArea>
        </Container>
      </BasicLayout>
    </>
  );
};

/*

import { Container, ScrollArea } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useEffect, useMemo } from 'react';
import { ErrorOverlay } from '../../../components/overlays/error';
import { LoadOverlay } from '../../../components/overlays/load';
import { NoItemsOverlay } from '../../../components/overlays/no-items';
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
			<BasicLayout>
				<Container>
					<PlanTitle semester={semesterId} />
					<ScrollArea
						styles={{
							viewport: {
								maxHeight: 'calc(100vh - 300px)',
								width: 'calc(100% - 14px)',
							},
						}}
						mt='xl'
						viewportRef={scrollableRef}
					>
						<LoadOverlay visible={isLoading} />
						<ErrorOverlay visible={isError} />
						<NoItemsOverlay
							visible={!isLoading && !isError && items?.length === 0}
						/>
						{items && (
							<SemesterPlanList lessons={items} vacations={vacations} />
						)}
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
		},
	);
};

const useVacations = (semesterId: string) => {
	const { data: semester } = trpc.semester.getById.useQuery(
		{
			id: semesterId,
		},
		{ retry: false },
	);
	return useMemo(() => {
		if (!semester) return [];
		// TODO: bitte beachten, dass Ferien erst am Montag darauf anfangen!
		return vacationDefinitions.filter(
			(v) => v.end >= semester.start && v.start <= semester.end,
		);
	}, [semester]);
};

*/
