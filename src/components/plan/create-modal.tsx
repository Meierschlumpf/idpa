import { Button, Grid, Group, Modal, Select, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import 'dayjs/locale/de-ch';
import { generateSelectDataWeekDays } from '../../helpers/time/get-week-days';
import { trpc } from '../../utils/trpc';

interface Props {
	opened: boolean;
	closeModal: () => void;
	subjectId: string;
}

export const PlanCreateModal = ({ opened, closeModal, subjectId }: Props) => {
	const { mutateAsync } = trpc.plan.create.useMutation();
	const utils = trpc.useContext();
	const form = useForm<FormType>({
		initialValues: {
			semesterId: '2023-01',
			day: 1,
		},
	});

	const daysData = [1, 2, 3, 4, 5];

	const handleSubmit = async (values: FormType) => {
		await mutateAsync(
			{
				subjectId,
				...values,
				day: values.day ?? 0,
			},
			{
				onError(error) {},
				onSuccess() {
					utils.planItem.getAll.invalidate();
					utils.planItem.getBySubjectId.invalidate();
					onClose();
				},
			},
		);
	};

	const onClose = () => {
		closeModal();
	};

	return (
		<Modal
			size='xl'
			onClose={onClose}
			opened={opened}
			title={<Title order={3}>Semesterplan erstellen</Title>}
		>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Grid>
					<Grid.Col span={12}>
						<Select
							label='Name'
							{...form.getInputProps('semesterId')}
							placeholder='Bitte Namen auswählen'
							data={[
								{ label: 'Frühlingssemester 2023', value: '2023-01' },
								{ label: 'Herbstsemester 2023', value: '2023-02' },
								{ label: 'Frühlingssemester 2024', value: '2024-01' },
								{ label: 'Herbstsemester 2024', value: '2024-02' },
							]}
						></Select>
					</Grid.Col>

					<Grid.Col span={12}>
						<Select
							label='Schultag'
							{...form.getInputProps('day')}
							placeholder='Bitte Schultag auswählen'
							data={generateSelectDataWeekDays(daysData)}
						></Select>
					</Grid.Col>

					<Grid.Col span={12}>
						<Group position='right'>
							<Button variant='subtle' color='gray' onClick={onClose}>
								Abbrechen
							</Button>
							<Button type='submit'>Erstellen</Button>
						</Group>
					</Grid.Col>
				</Grid>
			</form>
		</Modal>
	);
};

type FormType = {
	day?: number;
	semesterId: string;
};

const generateStart = () => {
	const now = new Date();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();
	if (month >= 2 && month <= 7) {
		return new Date(year, 8 - 1, 1);
	}
	return new Date(month >= 8 ? year + 1 : year, 2 - 1, 1);
};

const generateEnd = () => {
	const now = new Date();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();
	if (month >= 2 && month <= 7) {
		return new Date(year + 1, 1 - 1, 31);
	}
	return new Date(month >= 8 ? year + 1 : year, 7 - 1, 31);
};
