import {
	Button,
	Center,
	Container,
	Group,
	ScrollArea,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { useDisclosure, useScrollIntoView } from '@mantine/hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PlanCreateModal } from '../../components/plan/create-modal';
import { PlanItem } from '../../components/plan/item';
import { PlansSidebar } from '../../components/plan/sidebar';
import { TablerIconComponent } from '../../components/tablerIcon';
import { BasicLayout } from '../../layout/basic';
import { useAuthStore } from '../../stores/auth-store';
import { trpc } from '../../utils/trpc';

const Plan: NextPage = () => {
	const router = useRouter();
	const { subjectName } = router.query as { subjectName: string };
	const { data: subject } = trpc.subject.getByRouteName.useQuery({
		routeName: subjectName,
	});
	const role = useAuthStore(x => x.role);
	const { data: planItems } = trpc.plan.getBySubjectId.useQuery(
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
	const nextId = planItems
		?.filter((x) => x.date.getTime() >= today.getTime())
		.sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.id;

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
						<Group align='center'>
							<Title>Semesterplan {subject?.name}</Title>
							<TablerIconComponent size={30} name={subject?.icon ?? '123'} />
						</Group>
						{planItems?.length === 0 ? (role === 'teacher' && <><Button
							variant='light'
							onClick={createModal.open}
						>
							Semesterplan erstellen
						</Button><PlanCreateModal opened={createModalOpened} closeModal={createModal.close} subjectId={subject?.id ?? ''} /></>) : <Button
							onClick={() => scrollIntoView()}
							variant='light'
							color='gray'
						>
							Zur nächsten Lektion springen
						</Button>}
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
							{planItems?.map((item) => (
								<PlanItem
									key={item.date.getTime()}
									item={item}
									isNext={nextId === item.id}
									targetRef={nextId === item.id ? targetRef : undefined}
									mode={role === 'teacher' ? 'write' : 'read'}
								/>
							))}
						</Stack>
					</ScrollArea>
				</Container>
			</BasicLayout>
		</>
	);
};

export default Plan;
