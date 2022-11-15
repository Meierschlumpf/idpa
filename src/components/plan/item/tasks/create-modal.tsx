import { ActionIcon, Anchor, Button, Grid, Group, Menu, Modal, Stack, Text, Textarea, TextInput, Title, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconExternalLink, IconPlus, IconX } from '@tabler/icons';
import { showSuccessNotification } from '../../../../helpers/notifications/success';
import { BaseModalProps } from '../../../../types/base-modal-props';
import { trpc } from '../../../../utils/trpc';

interface TaskCreateModalProps extends BaseModalProps {
  planItemId: string;
  planId: string;
}

export const TaskCreateModal = ({ opened, closeModal, planId, planItemId }: TaskCreateModalProps) => {
  const utils = trpc.useContext();
  const { data: materials } = trpc.referenceMaterial.getByPlanId.useQuery({ planId });
  const { mutateAsync } = trpc.task.create.useMutation();
  const onClose = () => {
    closeModal();
    form.reset();
  };

  const form = useForm<FormType>({
    initialValues: {
      materialIds: [],
    },
    validate: {
      title: (value: string) => (!value ? 'Titel wird benötigt.' : null),
    },
  });

  const handleAdd = (id: string) => {
    form.insertListItem('materialIds', id);
  };

  const handleRemove = (id: string) => {
    const index = form.values.materialIds.findIndex((mId) => mId === id);
    if (index === -1) return;
    form.removeListItem('materialIds', index);
  };

  const handleSubmit = async (values: FormType) => {
    if (!values.title) return;
    await mutateAsync(
      {
        planItemId,
        materials: values.materialIds,
        description: !values.description || values.description.trim().length === 0 ? null : values.description,
        ...(values as unknown as any),
      },
      {
        onSuccess() {
          showSuccessNotification({
            title: 'Auftrag hinzugefügt',
            message: 'Der Auftrag wurde erfolgreich hinzugefügt!',
          });
          utils.task.getByPlanItemId.invalidate({ planItemId });
          utils.planItem.getByPlanId.invalidate({ planId });
          onClose();
        },
      }
    );
  };

  return (
    <Modal size="lg" opened={opened} onClose={onClose} title={<Title order={3}>Auftrag hinzufügen</Title>}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput required data-autoFocus {...form.getInputProps('title')} label="Auftragsname" />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea {...form.getInputProps('description')} label="Beschreibung" />
          </Grid.Col>
          {materials && materials.length !== 0 ? (
            <Grid.Col span={12}>
              <Stack spacing={0}>
                <Text weight={500} size="sm">
                  Materialien
                </Text>
                <Group style={{ height: 64 }} align="center">
                  {form.values.materialIds.map((x) => {
                    const material = materials?.find((m) => m.id === x);
                    return (
                      <Group align="start" key={x} p="sm">
                        <IconExternalLink />
                        <Group align="center">
                          <Stack spacing={0}>
                            <Text weight={500} size="sm">
                              {material?.name}
                            </Text>
                            <Anchor component="a" href={material?.link} target="_blank" size="xs">
                              Link öffnen
                            </Anchor>
                          </Stack>
                          <Tooltip label="Material entfernen">
                            <ActionIcon onClick={() => handleRemove(x)} variant="subtle" color="gray">
                              <IconX size={16} stroke={1.5} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Group>
                    );
                  })}
                  {form.values.materialIds.length !== materials?.length ? (
                    <Menu>
                      <Menu.Target>
                        <Tooltip label="Material hinzufügen">
                          <ActionIcon color="gray" variant="subtle">
                            <IconPlus size={16} stroke={1.5} />
                          </ActionIcon>
                        </Tooltip>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {materials
                          ?.filter((m) => !form.values.materialIds.includes(m.id))
                          .map((m) => (
                            <Menu.Item onClick={() => handleAdd(m.id)}>{m.name}</Menu.Item>
                          ))}
                      </Menu.Dropdown>
                    </Menu>
                  ) : null}
                </Group>
              </Stack>
            </Grid.Col>
          ) : null}
          <Grid.Col span={12}>
            <Group position="right">
              <Button onClick={onClose} variant="subtle" color="gray">
                Abbrechen
              </Button>
              <Button type="submit">Hinzufügen</Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  );
};

interface FormType {
  title?: string;
  description?: string;
  materialIds: string[];
}
