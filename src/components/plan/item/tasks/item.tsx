import { ActionIcon, Divider, Group, NavLink, Stack, Text, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconExternalLink, IconPencil, IconX } from '@tabler/icons';
import { AppRouterTypes } from '../../../../utils/trpc';

interface TaskItemProps {
  position: number;
  task: AppRouterTypes['task']['getByPlanItemId']['output'][0];
}

export const TaskItem = ({ position, task }: TaskItemProps) => {
  return (
    <>
      <Group position="apart" style={{ flexWrap: 'nowrap' }} align="start">
        <Title order={2} style={{ width: 100 }}>
          {position}.
        </Title>
        <Stack style={{ flex: 1 }}>
          <Group position="left">
            <Title order={5}>{task.title}</Title>
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
