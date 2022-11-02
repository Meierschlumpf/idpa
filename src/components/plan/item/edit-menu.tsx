import { ActionIcon, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons';
import { PlanItemEditModal } from './edit-modal';

interface Props {
	item: { id: string, title: string, description?: string, date: Date, badges: { id: string, name: string, evaluated: boolean }[] };
}

export const PlanItemEditMenu = ({ item }: Props) => {
	const [editModalOpened, editModal] = useDisclosure(false);

	return (
		<Group>
			<ActionIcon onClick={editModal.open}>
				<IconPencil size={16} stroke={1.5} />
			</ActionIcon>
			<PlanItemEditModal item={item} opened={editModalOpened} closeModal={editModal.close} />
		</Group>
	);
};