import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CreateThemeModal } from '../../../../components/pages/plans/[param]/edit/create-theme';
import { PlanEditList } from '../../../../components/pages/plans/[param]/edit/list';
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

	if (isError || itemsQuery.isError || role === 'student') {
		return <Page404 />;
	}

	return (
		<BasicLayout>
			<Container>
				<Group position='apart' align='center'>
					<Group>
						<TablerIconComponent size={40} name={plan?.subject?.icon} />
						<Stack spacing={4}>
							<Title order={3}>Semesterplan bearbeiten</Title>
							<Text weight={500}>
								{plan?.subject?.name} - {plan?.semesterId}
							</Text>
						</Stack>
					</Group>

					<Group align='center'>
						<Button variant='subtle' color='gray'>
							Zum nächsten Termin springen
						</Button>
						<Button onClick={newThemeModal.open}>Neues Thema</Button>
						<CreateThemeModal opened={newThemeModalOpened} closeModal={newThemeModal.close} items={items} plan={plan} />
					</Group>
				</Group>
				<Group></Group>

				{plan && <PlanEditList plan={plan} />}
			</Container>
		</BasicLayout>
	);
};

export default Page;

const useRouterParams = () => {
	const router = useRouter();
	return {
		id: router.query.param as string,
	};
};
