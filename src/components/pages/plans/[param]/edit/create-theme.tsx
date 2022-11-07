import { Button, Grid, Group, Modal, Select, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showSuccessNotification } from '../../../../../helpers/notifications/success';
import { formatDay } from '../../../../../helpers/time/format';
import { getWeekNumber } from '../../../../../helpers/time/get-week-number';
import { BaseModalProps } from '../../../../../types/base-modal-props';
import { AppRouterTypes, trpc } from '../../../../../utils/trpc';

interface CreateThemeModalProps extends BaseModalProps {
	items: AppRouterTypes['planItem']['getByPlanId']['output'];
	plan: AppRouterTypes['plan']['getById']['output'];
}

export const CreateThemeModal = ({ opened, closeModal, items, plan }: CreateThemeModalProps) => {
	const utils = trpc.useContext();
	const { mutateAsync } = trpc.planItem.createTheme.useMutation();
	const form = useForm<FormType>({
		validate: {
			theme: (value: string) => (!value ? 'Das Thema wird benötigt.' : value.length < 4 ? 'Das Thema muss mindestens 4 Zeichen enthalten.' : null),
			startId: (value: string) => (!value ? 'Der Start des Themas wird benötigt.' : null),
			endId: (value: string) => (!value ? 'Das Ende des Themas wird benötigt.' : null),
		},
	});
	const startItem = items?.find((x) => x.id === form.values.startId);

	const onClose = () => {
		closeModal();
		form.reset();
	};

	const handleSubmit = async (values: FormType) => {
		if (!plan || !values.theme || !values.startId || !values.endId) return;
		await mutateAsync(
			{
				planId: plan.id,
				...(values as unknown as any),
			},
			{
				onSuccess() {
					showSuccessNotification({
						title: 'Thema erstellt',
						message: 'Das Thema wurde erfolgreich erstellt!',
					});
					utils.planItem.getByPlanId.invalidate();
					onClose();
				},
			},
		);
	};

	return (
		<Modal size='lg' opened={opened} onClose={onClose} title={<Title order={3}>Thema hinzufügen</Title>}>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Grid>
					<Grid.Col span={12}>
						<TextInput label='Thema' {...form.getInputProps('theme')} data-autofocus />
					</Grid.Col>
					<Grid.Col span={6}>
						<Select
							data={
								items?.map((x) => ({
									value: x.id,
									label: `KW ${getWeekNumber(x.date)} - ${formatDay(x.date)}`,
								})) ?? []
							}
							{...form.getInputProps('startId')}
							label='Start'
							clearable
							onChange={(v) => {
								form.setFieldValue('endId', null);
								form.getInputProps('startId').onChange(v);
							}}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Select
							data={
								items
									?.filter((x) => !startItem || x.date.getTime() >= startItem.date.getTime())
									.map((x) => ({
										value: x.id,
										label: `KW ${getWeekNumber(x.date)} - ${formatDay(x.date)}`,
									})) ?? []
							}
							{...form.getInputProps('endId')}
							label='Ende'
							clearable
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Group position='right'>
							<Button onClick={onClose} variant='subtle' color='gray'>
								Abbrechen
							</Button>
							<Button type='submit'>Speichern</Button>
						</Group>
					</Grid.Col>
				</Grid>
			</form>
		</Modal>
	);
};

interface FormType {
	theme?: string;
	startId?: string;
	endId?: string | null;
}
