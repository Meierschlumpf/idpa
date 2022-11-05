import {
	Button,
	Group,
	Modal,
	Stack,
	Text,
	Textarea,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { trpc } from '../../../utils/trpc';
import { PlanLessonItem } from './lesson';
import { BadgeList } from './badge/list';

interface Props {
	item: {
		id: string;
		title: string;
		description?: string;
		date: Date;
		badges: { id: string; name: string; evaluated: boolean }[];
	};
	opened: boolean;
	closeModal: () => void;
}

export const PlanItemEditModal = ({ item, opened, closeModal }: Props) => {
	const { data: badges } = trpc.planItem.getBadges.useQuery();
	const { mutateAsync } = trpc.planItem.update.useMutation();
	const utils = trpc.useContext();
	const form = useForm<FormType>({
		initialValues: {
			title: item.title,
			description: item.description ?? '',
			badges: item.badges,
		},
	});

	const resetForm = () => {
		form.setFieldValue('title', item.title);
		form.setFieldValue('description', item.description ?? '');
		form.setFieldValue('badges', item.badges);
	};

	useEffect(() => {
		resetForm();
	}, [item.title, item.description, item.badges]);

	const onClose = () => {
		resetForm();
		closeModal();
	};

	const handleSwitch = async (id: string, evaluated: boolean) => {
		const badges = [...form.values.badges];
		const index = badges.findIndex((x) => x.id === id);
		if (badges[index]) badges[index]!.evaluated = evaluated;
		form.setFieldValue('badges', badges);
	};

	const handleAddition = async (id: string) => {
		const badge = badges?.find((x) => x.id === id);
		if (!badge) return;
		form.insertListItem('badges', { id, evaluated: badge.name === 'exam' });
	};

	const handleRemoval = async (id: string) => {
		const index = form.values.badges.findIndex((x) => x.id === id);
		if (index === -1) return;
		form.removeListItem('badges', index);
	};

	const handleSubmit = async (values: FormType) => {
		await mutateAsync(
			{
				id: item.id,
				...values,
			},
			{
				onSuccess() {
					utils.planItem.getAll.invalidate();
					utils.planItem.getBySubjectId.invalidate();
				},
			},
		);
		onClose();
	};

	return (
		<Modal
			size='xl'
			title={<Title order={3}>Lektion bearbeiten</Title>}
			opened={opened}
			onClose={onClose}
		>
			<Stack>
				<Stack spacing={4}>
					<Text weight={500} size='sm'>
						Vorschau
					</Text>
					<PlanLessonItem
						item={{
							id: item.id,
							date: item.date,
							title: form.values.title,
							description: form.values.description,
							badges:
								form.values.badges?.map((x) => ({
									...x,
									name: badges?.find((y) => y.id === x.id)?.name ?? 'unknown',
								})) ?? [],
						}}
					/>
				</Stack>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput {...form.getInputProps('title')} label='Thema' />
					<Textarea
						{...form.getInputProps('description')}
						label='Beschreibung'
					/>
					<Stack spacing={4}>
						<Text weight={500} size='sm'>
							Badges
						</Text>
						<BadgeList
							mode='write'
							activeBadges={form.values.badges}
							handleSwitch={handleSwitch}
							handleAddition={handleAddition}
							handleRemoval={handleRemoval}
						/>
					</Stack>
					<Group position='right'>
						<Button variant='subtle' color='gray' onClick={onClose}>
							Abbrechen
						</Button>
						<Button variant='light' type='submit'>
							Speichern
						</Button>
					</Group>
				</form>
			</Stack>
		</Modal>
	);
};

type FormType = {
	title: string;
	description: string;
	badges: { id: string; evaluated: boolean }[];
};
