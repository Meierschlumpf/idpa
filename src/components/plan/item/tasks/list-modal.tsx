import { Divider, Modal, Stack, Title } from '@mantine/core';
import { BaseModalProps } from '../../../../types/base-modal-props';
import { trpc } from '../../../../utils/trpc';
import { TaskItem } from './item';

interface TaskEditListModalProps extends BaseModalProps {
  planItemId: string;
}

export const TaskListModal = ({ opened, closeModal, planItemId }: TaskEditListModalProps) => {
  const { data: tasks } = trpc.task.getByPlanItemId.useQuery({
    planItemId,
  });

  const onClose = () => {
    closeModal();
  };

  return (
    <Modal size="lg" opened={opened} onClose={onClose} title={<Title order={3}>Aufträge</Title>}>
      <Stack pt="md">
        <Divider />
        {tasks?.map((t, i) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </Stack>
    </Modal>
  );
};

interface FormType {
  name?: string;
  link?: string;
}
