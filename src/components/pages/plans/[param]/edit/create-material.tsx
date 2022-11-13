import { Button, Grid, Group, Modal, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showSuccessNotification } from '../../../../../helpers/notifications/success';
import { BaseModalProps } from '../../../../../types/base-modal-props';
import { trpc } from '../../../../../utils/trpc';

interface CreateMaterialModalProps extends BaseModalProps {
  planId: string;
}

export const CreateMaterialModal = ({ opened, closeModal, planId }: CreateMaterialModalProps) => {
  const utils = trpc.useContext();
  const { mutateAsync } = trpc.referenceMaterial.create.useMutation();
  const form = useForm<FormType>({
    validate: {
      name: (value: string) => (!value ? 'Der Materialname wird benötigt.' : value.length < 4 ? 'Der Materialname muss mindestens 4 Zeichen enthalten.' : null),
      link: (value: string) => (!value ? 'Der Link zum Material wird benötigt.' : null),
    },
  });

  const onClose = () => {
    closeModal();
    form.reset();
  };

  const handleSubmit = async (values: FormType) => {
    if (!values.name || !values.link) return;
    await mutateAsync(
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
    );
  };

  return (
    <Modal size="lg" opened={opened} onClose={onClose} title={<Title order={3}>Thema hinzufügen</Title>}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput label="Name" {...form.getInputProps('name')} data-autofocus />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput label="Link" {...form.getInputProps('link')} />
          </Grid.Col>
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
  name?: string;
  link?: string;
}
