import { ActionIcon, Button, Divider, Group, Modal, NavLink, Stack, Text, Title, Tooltip } from '@mantine/core';
import { IconExternalLink, IconX } from '@tabler/icons';
import { BaseModalProps } from '../../../../../types/base-modal-props';
import { trpc } from '../../../../../utils/trpc';

interface TaskEditListModalProps extends BaseModalProps {}

export const TaskEditListModal = ({ opened, closeModal }: TaskEditListModalProps) => {
  const utils = trpc.useContext();
  //const { mutateAsync } = trpc.referenceMaterial.create.useMutation();

  const onClose = () => {
    closeModal();
  };

  const handleRemove = async (values: FormType) => {
    if (!values.name || !values.link) return;
    /*await mutateAsync(
      {
        planId: planId,
        ...(values as unknown as any),
      },
      {
        onSuccess() {
          showSuccessNotification({
            title: 'Material hinzugefügt',
            message: 'Das Referenzmaterial wurde erfolgreich hinzugefügt!',
          });
          utils.referenceMaterial.getByPlanId.invalidate();
          onClose();
        },
      }
    );*/
  };

  return (
    <Modal size="lg" opened={opened} onClose={onClose} title={<Title order={3}>Aufträge</Title>}>
      <Group position="center">
        <Button variant="subtle" color="gray">
          Neuer Auftrag
        </Button>
      </Group>
      <Stack pt="md">
        <Divider />
        <Group position="apart" style={{ flexWrap: 'nowrap' }} align="start">
          <Title order={1} style={{ width: 100 }}>
            1.
          </Title>
          <Stack>
            <Group position="apart">
              <Title order={5}>Auftrag xyz</Title>
              <Tooltip label="Auftrag entfernen">
                <ActionIcon>
                  <IconX stroke={1.5} size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto fugit dolorem repudiandae ducimus quia magnam dolores, tempore est rem et labore tenetur reiciendis vitae consectetur hic?
              Eius, debitis amet! Reiciendis?
            </Text>
            <Group>
              <NavLink icon={<IconExternalLink />} label="OneNote" style={{ width: 'auto' }} />
              <NavLink icon={<IconExternalLink />} label="OneNote" style={{ width: 'auto' }} />
            </Group>
          </Stack>
        </Group>
        <Divider />
      </Stack>
    </Modal>
  );
};

interface FormType {
  name?: string;
  link?: string;
}
