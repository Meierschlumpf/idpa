import {
	Button,
	Center,
	Container,
	Group,
	ScrollArea,
	Stack,
	Text,
} from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { PlanItem, PlanItemMapperProps } from '../../../components/plan/item';
import { PlansSidebar } from '../../../components/plan/sidebar';
import { PlanTitle } from '../../../components/plan/title';
import { vacations } from '../../../constants/vacations';
import { BasicLayout } from '../../../layout/basic';
import { useAuthStore } from '../../../stores/auth-store';
import { trpc } from '../../../utils/trpc';

const SemesterPlan: NextPage = () => {
	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
		duration: 100,
	});
	const { subject, plan, lessons } = useSemesterPlan();
	const role = useAuthStore((x) => x.role);

	const inSpecVacations = useMemo(() => {
		if (!plan) return [];
		return vacations.filter((x) => x.end >= plan.start && x.start <= plan.end);
	}, [plan]);

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const nextLessonId = lessons
		?.filter((x) => x.date.getTime() >= today.getTime())
		.sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.id;
	const nextVacationStart = inSpecVacations
		.filter(
			(x) => x.start.getTime() >= today.getTime() + 1000 * 60 * 60 * 24 * 3,
		)
		.sort((a, b) => a.start.getTime() - b.start.getTime())[0]
		?.start.getTime();
	const currentlyInVacation = inSpecVacations.some(
		(v) =>
			v.start.getTime() <= today.getTime() + 1000 * 60 * 60 * 24 * 3 &&
			v.end.getTime() >= today.getTime() - 1000 * 60 * 60 * 24,
	);
	const nextVacationEnd = inSpecVacations
		.filter((x) => x.end.getTime() >= today.getTime() - 1000 * 60 * 60 * 24)
		.sort((a, b) => a.end.getTime() - b.end.getTime())[0]
		?.end.getTime();

	return (
		<>
			<Head>
				<title>IDPA - Semesterplantool</title>
				<meta
					name='description'
					content='A semesterplan tool that has been created as part of an idpa'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<BasicLayout sidebarContent={<PlansSidebar />}>
				<Container>
					<Group position='apart' pb='md'>
						<PlanTitle subject={subject} planName={plan?.name} />
						<Button
							onClick={() => scrollIntoView()}
							variant='light'
							color='gray'
						>
							Zur nächsten Lektion springen
						</Button>
					</Group>
					<ScrollArea
						styles={{
							viewport: {
								maxHeight: 'calc(100vh - 300px)',
								width: 'calc(100% - 14px)',
							},
						}}
						viewportRef={scrollableRef}
					>
						<Stack>
							{lessons?.length === 0 && (
								<Center>
									<Text weight={500}>Es wurden keine Elemente gefunden</Text>
								</Center>
							)}
							{(
								lessons?.map((item) => ({
									type: 'lesson',
									props: {
										item,
										isNext: nextLessonId === item.id,
										targetRef: nextLessonId === item.id ? targetRef : undefined,
										mode: role === 'teacher' ? 'write' : 'read',
									},
									sortBy: item.date,
								})) as PlanItemMapperProps[]
							)
								.concat(
									inSpecVacations.map((vacation) => ({
										type: 'vacation',
										props: {
											...vacation,
											isNext:
												!currentlyInVacation &&
												nextVacationStart === vacation.start.getTime(),
											isCurrent:
												currentlyInVacation &&
												nextVacationEnd === vacation.end.getTime(),
										},
										sortBy: vacation.start,
									})),
								)
								.sort((a, b) => a.sortBy.getTime() - b.sortBy.getTime())
								.map((props, key) => (
									<PlanItem key={key} {...props} />
								))}
						</Stack>
					</ScrollArea>
				</Container>
			</BasicLayout>
		</>
	);
};

export default SemesterPlan;

type RouteParamsType = {
	subjectName: string;
	semester: string;
};

const useSemesterPlan = () => {
	const router = useRouter();
	const { subjectName, semester } = router.query as RouteParamsType;
	const { data: subject, ...subjectQuery } =
		trpc.subject.getByRouteName.useQuery(
			{
				routeName: subjectName,
			},
			{
				enabled: !!subjectName,
			},
		);
	const { data: plan, ...planQuery } = trpc.plan.getByNameAndSubjectId.useQuery(
		{
			name: semester,
			subjectId: subject?.id ?? '',
		},
		{
			enabled: !!subject && !!semester,
		},
	);
	const { data: lessons, ...lessonsQuery } = trpc.planItem.getByPlanId.useQuery(
		{ planId: plan?.id ?? '' },
		{
			enabled: !!plan,
		},
	);
	return {
		isError: subjectQuery.isError || planQuery.isError || lessonsQuery.isError,
		isLoading:
			subjectQuery.isLoading || planQuery.isLoading || lessonsQuery.isLoading,
		subject,
		plan,
		lessons,
	};
};
