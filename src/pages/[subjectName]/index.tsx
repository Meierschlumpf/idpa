import {
	Button,
	Center,
	Container,
	Group,
	ScrollArea,
	Stack,
	Text,
} from '@mantine/core';
import { useDisclosure, useScrollIntoView } from '@mantine/hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PlanCreateModal } from '../../components/plan/create-modal';
import { PlanItem, PlanItemMapperProps } from '../../components/plan/item';
import { PlansSidebar } from '../../components/plan/sidebar';
import { PlanTitle } from '../../components/plan/title';
import { vacationDefinitions } from '../../constants/vacations';
import { BasicLayout } from '../../layout/basic';
import { useAuthStore } from '../../stores/auth-store';
import { trpc } from '../../utils/trpc';

const Plan: NextPage = () => {
	const router = useRouter();
	const { subjectName } = router.query as { subjectName: string };
	const { data: subject } = trpc.subject.getByRouteName.useQuery({
		routeName: subjectName,
	});
	const role = useAuthStore((x) => x.role);
	const { data: planItems } = trpc.planItem.getBySubjectId.useQuery(
		{ subjectId: subject?.id ?? null },
		{
			enabled: subject != undefined,
		},
	);
	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
		duration: 100,
	});
	const [createModalOpened, createModal] = useDisclosure(false);

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const nextLessonId = planItems
		?.filter((x) => x.date.getTime() >= today.getTime())
		.sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.id;
	const nextVacationStart = vacationDefinitions
		.filter(
			(x) => x.start.getTime() >= today.getTime() + 1000 * 60 * 60 * 24 * 3,
		)
		.sort((a, b) => a.start.getTime() - b.start.getTime())[0]
		?.start.getTime();
	const currentlyInVacation = vacationDefinitions.some(
		(v) =>
			v.start.getTime() <= today.getTime() + 1000 * 60 * 60 * 24 * 3 &&
			v.end.getTime() >= today.getTime() - 1000 * 60 * 60 * 24,
	);
	const nextVacationEnd = vacationDefinitions
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
						<PlanTitle subject={subject} />
						{planItems?.length !== 0 ? (
							role === 'teacher' && (
								<>
									<Button variant='light' onClick={createModal.open}>
										Semesterplan erstellen
									</Button>
									<PlanCreateModal
										opened={createModalOpened}
										closeModal={createModal.close}
										subjectId={subject?.id ?? ''}
									/>
								</>
							)
						) : (
							<Button
								onClick={() => scrollIntoView()}
								variant='light'
								color='gray'
							>
								Zur nächsten Lektion springen
							</Button>
						)}
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
							{planItems?.length === 0 && (
								<Center>
									<Text weight={500}>Es wurden keine Elemente gefunden</Text>
								</Center>
							)}
							{(
								planItems?.map((item) => ({
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
									vacationDefinitions.map((vacation) => ({
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

export default Plan;
