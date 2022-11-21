import { Button, Divider, Group, Modal, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BaseModalProps } from '../../../../../types/base-modal-props';
import { trpc } from '../../../../../utils/trpc';
import { TaskCreateModal } from '../../../../plan/item/tasks/create-modal';
import { EditTaskItem } from './edit-task-item';

interface TaskEditListModalProps extends BaseModalProps {
  planId: string;
  planItemId: string;
}

export const TaskEditListModal = ({ opened, closeModal, planId, planItemId }: TaskEditListModalProps) => {
  const [createModalOpened, createModal] = useDisclosure(false);
  const { data: tasks } = trpc.task.getByPlanItemId.useQuery({
    planItemId,
  });

  const onClose = () => {
    closeModal();
  };

  return (
    <Modal size="lg" opened={opened} onClose={onClose} title={<Title order={3}>Aufträge</Title>}>
      <Group position="center">
        <Button onClick={createModal.open} variant="subtle" color="gray">
          Neuer Auftrag
        </Button>
        <TaskCreateModal opened={createModalOpened} closeModal={createModal.close} planId={planId} planItemId={planItemId} />
      </Group>
      <Stack pt="md">
        <Divider />
        {tasks?.map((t, i) => (
          <EditTaskItem key={t.id} task={t} position={i + 1} planItemId={planItemId} planId={planId} />
        ))}
      </Stack>
    </Modal>
  );
};

interface FormType {
  name?: string;
  link?: string;
}
