import { ActionIcon, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons';
import { AppRouterTypes } from '../../../utils/trpc';
import { PlanItemEditModal } from './edit-modal';

interface Props {
  item: AppRouterTypes['planItem']['getBySemesterId']['output'][0];
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
