import { ActionIcon, Anchor, Box, Center, Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBooks, IconExternalLink, IconPlus, IconX } from '@tabler/icons';
import { showSuccessNotification } from '../../../../../helpers/notifications/success';
import { trpc } from '../../../../../utils/trpc';
import { CreateMaterialModal } from './create-material';

interface EditPlanAsideProps {
  planId: string;
}

export const EditPlanAside = ({ planId }: EditPlanAsideProps) => {
  const [newMaterialModalOpened, newMaterialModal] = useDisclosure(false);
  const { data: referenceMaterials, isLoading } = trpc.referenceMaterial.getByPlanId.useQuery({
    planId,
  });
  const { mutateAsync } = trpc.referenceMaterial.remove.useMutation();
  const utils = trpc.useContext();

  const handleRemove = async (id: string) => {
    await mutateAsync(
      {
        materialId: id,
      },
      {
        onSuccess: () => {
          showSuccessNotification({
            title: 'Material entfernt',
            message: 'Das Referenzmaterial wurde erfolgreich entfernt!',
          });
          utils.referenceMaterial.getByPlanId.invalidate();
        },
      }
    );
  };

  return (
    <>
      <Group position="apart" align="center">
        <Group>
          <IconBooks />
          <Title order={5}>Referenzmaterial</Title>
        </Group>
        <Group>
          <Tooltip label="Material hinzufügen">
            <ActionIcon onClick={newMaterialModal.open}>
              <IconPlus size={16} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <CreateMaterialModal opened={newMaterialModalOpened} closeModal={newMaterialModal.close} planId={planId} />
        </Group>
      </Group>
      {!isLoading && referenceMaterials?.length === 0 ? (
        <Center mt="sm">
          <Text weight={500} size="sm">
            Nichts gefunden!
          </Text>
        </Center>
      ) : (
        <Box mt="sm">
          {referenceMaterials?.map((rm) => (
            <>
              <Group key={rm.id} p="sm" position="apart">
                <Group spacing="sm" align="start">
                  <IconExternalLink />
                  <Stack spacing={0}>
                    <Text size="sm" weight={500}>
                      {rm.name}
                    </Text>
                    <Anchor component="a" href={rm.link} target="_blank" size="xs">
                      Link öffnen
                    </Anchor>
                  </Stack>
                </Group>
                <Tooltip label="Material entfernen">
                  <ActionIcon onClick={() => handleRemove(rm.id)}>
                    <IconX size={16} stroke={1.5} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </>
          ))}
        </Box>
      )}
    </>
  );
};
