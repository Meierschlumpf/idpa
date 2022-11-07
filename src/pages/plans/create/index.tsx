import { Button, Container, Group, Select, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { showSuccessNotification } from '../../../helpers/notifications/success';
import { generateSelectDataWeekDays } from '../../../helpers/time/get-week-days';
import { BasicLayout } from '../../../layout/basic';
import { Page404 } from '../../../layout/errors/404';
import { useAuthStore } from '../../../stores/auth-store';
import { trpc } from '../../../utils/trpc';

const Page: NextPage = () => {
	const { data: semesters } = trpc.semester.getAll.useQuery();
	const { data: subjects } = trpc.subject.getAll.useQuery();
	const { mutateAsync } = trpc.plan.create.useMutation();
	const form = useForm<FormType>({
		validate: {
			subjectId: (value: string) => (!value ? 'Das Fach wird benötigt!' : null),
			semesterId: (value: string) =>
				!value ? 'Das Semester wird benötigt!' : null,
			day: (value: number) => (!value ? 'Der Schultag wird benötigt!' : null),
		},
	});
	const router = useRouter();
	const role = useAuthStore((x) => x.role);

	if (role === 'student') return <Page404 />;

	const handleSubmit = async (values: FormType) => {
		if (!values.semesterId || !values.subjectId || !values.day) return;
		await mutateAsync(values as unknown as any, {
			onSuccess(plan) {
				showSuccessNotification({
					title: 'Plan erstellt',
					message: 'Der Semesterplan wurde erfolgreich erstellt!',
				});
				router.push(`/plans/${plan.id}/edit`);
			},
		});
	};

	return (
		<BasicLayout>
			<Container>
				<Title order={3}>Semesterplan erstellen</Title>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Stack mt='xl'>
						<Select
							label='Semester'
							placeholder='Bitte Semester auswählen'
							data={
								semesters?.map((s) => ({
									label: s.id,
									value: s.id,
								})) ?? []
							}
							{...form.getInputProps('semesterId')}
						></Select>

						<Select
							label='Schultag'
							placeholder='Bitte Schultag auswählen'
							data={generateSelectDataWeekDays([1, 2, 3, 4, 5])}
							{...form.getInputProps('day')}
						></Select>

						<Select
							label='Fach'
							placeholder='Bitte Fach auswählen'
							data={
								subjects?.map((s) => ({
									label: s.name,
									value: s.id,
								})) ?? []
							}
							{...form.getInputProps('subjectId')}
						></Select>

						<Group position='right'>
							<Button variant='subtle' color='gray'>
								Abbrechen
							</Button>
							<Button type='submit'>Erstellen</Button>
						</Group>
					</Stack>
				</form>
			</Container>
		</BasicLayout>
	);
};

export default Page;

interface FormType {
	semesterId?: string;
	subjectId?: string;
	day?: number;
}
