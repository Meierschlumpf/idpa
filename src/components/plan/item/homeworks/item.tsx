import { Checkbox, Divider, Group, NavLink, Stack, Text, Title } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { AppRouterTypes, trpc } from '../../../../utils/trpc';

interface HomeworkItemProps {
  homework: AppRouterTypes['homework']['getByPlanItemId']['output'][0];
}

export const HomeworkItem = ({ homework }: HomeworkItemProps) => {
  const utils = trpc.useContext();
  const doneMutation = trpc.homework.done.useMutation();
  const todoMutation = trpc.homework.todo.useMutation();
  const [isDone, setIsDone] = useState(homework.isDone);

  useEffect(() => {
    setIsDone(homework.isDone);
  }, [homework.isDone]);

  const handleDone = async () => {
    await doneMutation.mutateAsync(
      {
        id: homework.id,
      },
      {
        onSuccess() {
          utils.homework.getByPlanItemId.invalidate();
          utils.planItem.getBySemesterId.invalidate();
          utils.planItem.getBySubjectId.invalidate();
          utils.planItem.getNext.invalidate();
        },
      }
    );
  };

  const handleTodo = async () => {
    await todoMutation.mutateAsync(
      {
        id: homework.id,
      },
      {
        onSuccess() {
          utils.homework.getByPlanItemId.invalidate();
          utils.planItem.getBySemesterId.invalidate();
          utils.planItem.getBySubjectId.invalidate();
          utils.planItem.getNext.invalidate();
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
            <Title order={5}>{homework.title}</Title>
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
