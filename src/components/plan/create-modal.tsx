import { Button, Grid, Group, Modal, Select, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { trpc } from "../../utils/trpc";

interface Props {
	opened: boolean;
	closeModal: () => void;
	subjectId: string;
}

export const PlanCreateModal = ({ opened, closeModal, subjectId }: Props) => {

	const { mutateAsync } = trpc.plan.create.useMutation();
	const form = useForm<FormType>({
		initialValues: {
			start: generateStart(),
			end: generateEnd(),
			day: null
		}
	})

	const handleSubmit = async (values: FormType) => {
		await mutateAsync({
			subjectId,
			...values,
			day: values.day ?? 'Montag'
		}, {
			onError(error) {

			},
			onSuccess() {

			}
		});
	}

	const onClose = () => {
		closeModal();
	}

	return <Modal size="xl" onClose={onClose} opened={opened} title={<Title order={3}>Semesterplan erstellen</Title>}>
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Grid>
				<Grid.Col span={6}>
					<DatePicker {...form.getInputProps('start')} label="Start" />
				</Grid.Col>

				<Grid.Col span={6}>
					<DatePicker {...form.getInputProps('end')} label="Ende" />
				</Grid.Col>

				<Grid.Col span={12}>
					<Select {...form.getInputProps('day')} placeholder="Bitte Schultag auswählen" data={['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']}></Select>
				</Grid.Col>

				<Grid.Col span={12}>
					<Group position="right">
						<Button variant="subtle" color="gray" onClick={onClose}>Abbrechen</Button>
						<Button type="submit">Erstellen</Button>
					</Group>
				</Grid.Col>
			</Grid>
		</form>
	</Modal>
}

type FormType = {
	start: Date;
	end: Date;
	day: string | null;
}

const generateStart = () => {
	const now = new Date();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();
	if (month >= 2 && month <= 7) {
		return new Date(year, 8 - 1, 1);
	}
	return new Date(month >= 8 ? year + 1 : year, 2 - 1, 1)
}

const generateEnd = () => {
	const now = new Date();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();
	if (month >= 2 && month <= 7) {
		return new Date(year + 1, 1 - 1, 31);
	}
	return new Date(month >= 8 ? year + 1 : year, 7 - 1, 31)
}