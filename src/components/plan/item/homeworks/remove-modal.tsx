import { Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { showSuccessNotification } from '../../../../helpers/notifications/success';
import { BaseModalProps } from '../../../../types/base-modal-props';
import { AppRouterTypes, trpc } from '../../../../utils/trpc';

interface HomeworkRemoveModalProps extends BaseModalProps {
  homework: AppRouterTypes['homework']['getByPlanItemId']['output'][0];
  planItemId: string;
}

export const HomeworkRemoveModal = ({ opened, closeModal, homework, planItemId }: HomeworkRemoveModalProps) => {
  const utils = trpc.useContext();
  const { mutateAsync } = trpc.homework.remove.useMutation();

  const onClose = () => {
    closeModal();
  };

  const handleRemove = async () => {
    await mutateAsync(
      {
        id: homework.id,
      },
      {
        onSuccess() {
          showSuccessNotification({
            title: 'Hausaufgabe entfernt',
            message: 'Die Hausaufgabe wurde erfolgreich entfernt!',
          });
          utils.homework.getByPlanItemId.invalidate({ planItemId });
        },
      }
    );
  };

  return (
    <Modal size="md" opened={opened} onClose={onClose} title={<Title order={3}>Auftrag entfernen</Title>}>
      <Stack>
        <Text>
          Bist du sicher, dass du die Hausaufgabe{' '}
          <Text span weight={500}>
            {homework.title}
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
