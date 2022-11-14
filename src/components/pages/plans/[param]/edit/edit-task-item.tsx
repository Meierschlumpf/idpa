import { ActionIcon, Divider, Group, NavLink, Stack, Text, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconExternalLink, IconPencil, IconX } from '@tabler/icons';
import { showSuccessNotification } from '../../../../../helpers/notifications/success';
import { AppRouterTypes, trpc } from '../../../../../utils/trpc';
import { TaskEditModal } from '../../../../plan/item/tasks/edit-modal';
import { TaskRemoveModal } from '../../../../plan/item/tasks/remove-modal';

interface EditTaskItemProps {
  position: number;
  task: AppRouterTypes['task']['getByPlanItemId']['output'][0];
  planItemId: string;
  planId: string;
}

export const EditTaskItem = ({ position, task, planItemId, planId }: EditTaskItemProps) => {
  const [removeModalOpened, removeModal] = useDisclosure(false);
  const [editModalOpened, editModal] = useDisclosure(false);

  return (
    <>
      <Group position="apart" style={{ flexWrap: 'nowrap' }} align="start">
        <Title order={1} style={{ width: 100 }}>
          {position}.
        </Title>
        <Stack style={{ flex: 1 }}>
          <Group position="apart">
            <Title order={5}>{task.title}</Title>
            <Group>
              <Tooltip label="Auftrag bearbeiten">
                <ActionIcon onClick={editModal.open}>
                  <IconPencil stroke={1.5} size={16} />
                </ActionIcon>
              </Tooltip>
              <TaskEditModal opened={editModalOpened} closeModal={editModal.close} task={task} planItemId={planItemId} planId={planId} />
              <Tooltip label="Auftrag entfernen">
                <ActionIcon onClick={removeModal.open}>
                  <IconX stroke={1.5} size={16} />
                </ActionIcon>
              </Tooltip>
              <TaskRemoveModal opened={removeModalOpened} closeModal={removeModal.close} task={task} planItemId={planItemId} />
            </Group>
          </Group>
          {task.description && <Text>{task.description}</Text>}
          <Group>
            {task.materials.map((m) => (
              <NavLink key={m.id} component="a" href={m.link} target="_blank" icon={<IconExternalLink />} label={m.name} style={{ width: 'auto' }} />
            ))}
          </Group>
        </Stack>
      </Group>
      <Divider />
    </>
  );
};
