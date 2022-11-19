import { ActionIcon, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons';
import { AppRouterTypes } from '../../../utils/trpc';
import { PlanItemEditModal } from './edit-modal';

interface Props {
  planId: string;
  item: Exclude<AppRouterTypes['planItem']['getByPlanId']['output'], undefined>[0];
}

export const PlanItemEditMenu = ({ planId, item }: Props) => {
  const [editModalOpened, editModal] = useDisclosure(false);

  return (
    <Group>
      <ActionIcon onClick={editModal.open}>
        <IconPencil size={16} stroke={1.5} />
      </ActionIcon>
      <PlanItemEditModal planId={planId} item={item} opened={editModalOpened} closeModal={editModal.close} />
    </Group>
  );
};
