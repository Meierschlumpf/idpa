import { Button, Group, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCheckbox, IconHomeCheck } from '@tabler/icons';
import { TaskButton } from './button';

interface PlanItemTaskBase {
  type: 'read' | 'write';
  onHomeworkClick: () => Promise<void> | void;
  onTasksClick: () => Promise<void> | void;
  task: { count: number; totalCount: number };
}

export const PlanItemTaskBase = ({ type, onHomeworkClick, onTasksClick, task }: PlanItemTaskBase) => {
  return (
    <Group>
      <TaskButton tooltipLabel="Hausaufgaben" onClick={onHomeworkClick} icon={IconHomeCheck} count={0} totalCount={0} type={type} />
      <TaskButton tooltipLabel="Aufträge" onClick={onTasksClick} icon={IconCheckbox} {...task} type={type} />
    </Group>
  );
};