import { Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { showSuccessNotification } from '../../../../helpers/notifications/success';
import { BaseModalProps } from '../../../../types/base-modal-props';
import { AppRouterTypes, trpc } from '../../../../utils/trpc';

interface TaskRemoveModalProps extends BaseModalProps {
  task: AppRouterTypes['task']['getByPlanItemId']['output'][0];
  planItemId: string;
}

export const TaskRemoveModal = ({ opened, closeModal, task, planItemId }: TaskRemoveModalProps) => {
  const utils = trpc.useContext();
  const { mutateAsync } = trpc.task.remove.useMutation();

  const onClose = () => {
    closeModal();
  };

  const handleRemove = async () => {
    await mutateAsync(
      {
        id: task.id,
      },
      {
        onSuccess() {
          showSuccessNotification({
            title: 'Auftrag entfernt',
            message: 'Der Auftrag wurde erfolgreich entfernt!',
          });
          utils.task.getByPlanItemId.invalidate({ planItemId });
        },
      }
    );
  };

  return (
    <Modal size="md" opened={opened} onClose={onClose} title={<Title order={3}>Auftrag entfernen</Title>}>
      <Stack>
        <Text>
          Bist du sicher, dass du den Auftrag{' '}
          <Text span weight={500}>
            {task.title}
          </Text>{' '}
          entfernen möchtest?
        </Text>
        <Group position="right">
          <Button onClick={onClose} variant="subtle" color="gray">
            Nein
          </Button>
          <Button onClick={handleRemove} color="red">
            Ja
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
