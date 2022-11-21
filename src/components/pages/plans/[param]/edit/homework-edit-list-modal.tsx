import { Button, Divider, Group, Modal, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BaseModalProps } from '../../../../../types/base-modal-props';
import { trpc } from '../../../../../utils/trpc';
import { HomeworkCreateModal } from '../../../../plan/item/homeworks/create-modal';
import { EditHomeworkItem } from './edit-homework-item';

interface HomeworkEditListModalProps extends BaseModalProps {
  planId: string;
  planItemId: string;
}

export const HomeworkEditListModal = ({ opened, closeModal, planId, planItemId }: HomeworkEditListModalProps) => {
  const [createModalOpened, createModal] = useDisclosure(false);
  const { data: homeworks } = trpc.homework.getByPlanItemId.useQuery({
    planItemId,
  });

  const onClose = () => {
    closeModal();
  };

  return (
    <Modal size="lg" opened={opened} onClose={onClose} title={<Title order={3}>Hausaufgaben</Title>}>
      <Group position="center">
        <Button onClick={createModal.open} variant="subtle" color="gray">
          Neue Hausaufgabe
        </Button>
        <HomeworkCreateModal opened={createModalOpened} closeModal={createModal.close} planId={planId} planItemId={planItemId} />
      </Group>
      <Stack pt="md">
        <Divider />
        {homeworks?.map((t, i) => (
          <EditHomeworkItem key={t.id} homework={t} position={i + 1} planItemId={planItemId} planId={planId} />
        ))}
      </Stack>
    </Modal>
  );
};

interface FormType {
  name?: string;
  link?: string;
}
