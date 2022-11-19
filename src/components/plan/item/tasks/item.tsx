import { Checkbox, Divider, Group, NavLink, Stack, Text, Title } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { AppRouterTypes, trpc } from '../../../../utils/trpc';

interface TaskItemProps {
  task: AppRouterTypes['task']['getByPlanItemId']['output'][0];
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const utils = trpc.useContext();
  const doneMutation = trpc.task.done.useMutation();
  const todoMutation = trpc.task.todo.useMutation();
  const [isDone, setIsDone] = useState(task.isDone);

  useEffect(() => {
    setIsDone(task.isDone);
  }, [task.isDone]);

  const handleDone = async () => {
    await doneMutation.mutateAsync(
      {
        id: task.id,
      },
      {
        onSuccess() {
          utils.task.getByPlanItemId.invalidate();
          utils.planItem.getBySemesterId.invalidate();
          utils.planItem.getBySubjectId.invalidate();
        },
      }
    );
  };

  const handleTodo = async () => {
    await todoMutation.mutateAsync(
      {
        id: task.id,
      },
      {
        onSuccess() {
          utils.task.getByPlanItemId.invalidate();
          utils.planItem.getBySemesterId.invalidate();
          utils.planItem.getBySubjectId.invalidate();
        },
      }
    );
  };

  return (
    <>
      <Group position="apart" style={{ flexWrap: 'nowrap' }} align="start">
        <Checkbox
          mt={4}
          onChange={async (v) => {
            setIsDone(v.target.checked);
            !v.target.checked ? await handleTodo() : await handleDone();
          }}
          checked={isDone}
        />
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
