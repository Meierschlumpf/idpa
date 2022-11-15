import { useDisclosure } from '@mantine/hooks';
import { AppRouterTypes } from '../../../../utils/trpc';
import { PlanItemTaskBase } from '../../../plan/item/tasks';
import { TaskListModal } from '../../../plan/item/tasks/list-modal';

interface PlanItemTasksProps {
  planItem: AppRouterTypes['planItem']['getBySemesterId']['output'][0];
}

export const PlanItemTasks = ({ planItem }: PlanItemTasksProps) => {
  const [taskModalOpened, taskModal] = useDisclosure(false);
  const onHomeworkClick = () => {};

  return (
    <>
      <PlanItemTaskBase type="read" onHomeworkClick={onHomeworkClick} onTasksClick={taskModal.open} task={planItem.task} />
      <TaskListModal opened={taskModalOpened} closeModal={taskModal.close} planItemId={planItem.id} />
    </>
  );
};
