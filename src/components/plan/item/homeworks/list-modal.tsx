import { Divider, Modal, Stack, Title } from '@mantine/core';
import { BaseModalProps } from '../../../../types/base-modal-props';
import { trpc } from '../../../../utils/trpc';
import { HomeworkItem } from './item';

interface HomeworkEditListModalProps extends BaseModalProps {
  planItemId: string;
}

export const HomeworkListModal = ({ opened, closeModal, planItemId }: HomeworkEditListModalProps) => {
  const { data: homeworks } = trpc.homework.getByPlanItemId.useQuery({
    planItemId,
  });

  const onClose = () => {
    closeModal();
  };

  return (
    <Modal size="lg" opened={opened} onClose={onClose} title={<Title order={3}>Hausaufgaben</Title>}>
      <Stack pt="md">
        <Divider />
        {homeworks?.map((t, i) => (
          <HomeworkItem key={t.id} homework={t} />
        ))}
      </Stack>
    </Modal>
  );
};

interface FormType {
  name?: string;
  link?: string;
}
