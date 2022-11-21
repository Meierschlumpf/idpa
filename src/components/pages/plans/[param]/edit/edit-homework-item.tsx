import { ActionIcon, Divider, Group, NavLink, Stack, Text, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconExternalLink, IconPencil, IconX } from '@tabler/icons';
import { AppRouterTypes } from '../../../../../utils/trpc';
import { HomeworkEditModal } from '../../../../plan/item/homeworks/edit-modal';
import { HomeworkRemoveModal } from '../../../../plan/item/homeworks/remove-modal';

interface EditHomeworkItemProps {
  position: number;
  homework: AppRouterTypes['homework']['getByPlanItemId']['output'][0];
  planItemId: string;
  planId: string;
}

export const EditHomeworkItem = ({ position, homework, planItemId, planId }: EditHomeworkItemProps) => {
  const [removeModalOpened, removeModal] = useDisclosure(false);
  const [editModalOpened, editModal] = useDisclosure(false);

  return (
    <>
      <Group position="apart" style={{ flexWrap: 'nowrap' }} align="start">
        <Title order={2} style={{ width: 100 }}>
          {position}.
        </Title>
        <Stack style={{ flex: 1 }}>
          <Group position="apart">
            <Title order={5}>{homework.title}</Title>
            <Group>
              <Tooltip label="Hausaufgabe bearbeiten">
                <ActionIcon onClick={editModal.open}>
                  <IconPencil stroke={1.5} size={16} />
                </ActionIcon>
              </Tooltip>
              <HomeworkEditModal opened={editModalOpened} closeModal={editModal.close} homework={homework} planItemId={planItemId} planId={planId} />
              <Tooltip label="Hausaufgabe entfernen">
                <ActionIcon onClick={removeModal.open}>
                  <IconX stroke={1.5} size={16} />
                </ActionIcon>
              </Tooltip>
              <HomeworkRemoveModal opened={removeModalOpened} closeModal={removeModal.close} homework={homework} planItemId={planItemId} />
            </Group>
          </Group>
          {homework.description && <Text>{homework.description}</Text>}
          <Group>
            {homework.materials.map((m) => (
              <NavLink key={m.id} component="a" href={m.link} target="_blank" icon={<IconExternalLink />} label={m.name} style={{ width: 'auto' }} />
            ))}
          </Group>
        </Stack>
      </Group>
      <Divider />
    </>
  );
};
