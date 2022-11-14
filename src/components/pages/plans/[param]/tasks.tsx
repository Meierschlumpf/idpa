import { AppRouterTypes } from '../../../../utils/trpc';
import { PlanItemTaskBase } from '../../../plan/item/tasks';

interface PlanItemTasksProps {
  planItem: AppRouterTypes['planItem']['getBySemesterId']['output'][0];
}

export const PlanItemTasks = ({ planItem }: PlanItemTasksProps) => {
  const onTasksClick = () => {};
  const onHomeworkClick = () => {};

  return (
    <>
      <PlanItemTaskBase type="read" onHomeworkClick={onHomeworkClick} onTasksClick={onTasksClick} task={planItem.task} />
    </>
  );
};
