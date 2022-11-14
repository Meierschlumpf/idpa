import { useDisclosure } from '@mantine/hooks';
import { AppRouterTypes } from '../../../../../utils/trpc';
import { PlanItemTaskBase } from '../../../../plan/item/tasks';
import { TaskEditListModal } from './task-edit-list-modal';

interface EditPlanItemTasksProps {
  planItem: AppRouterTypes['planItem']['getBySemesterId']['output'][0];
  planId: string;
}

export const EditPlanItemTasks = ({ planId, planItem }: EditPlanItemTasksProps) => {
  const [taskEditListModalOpened, taskEditListModal] = useDisclosure(false);
  const onHomeworkClick = () => {};

  return (
    <>
      <PlanItemTaskBase type="write" onHomeworkClick={onHomeworkClick} onTasksClick={taskEditListModal.open} task={planItem.task} />
      <TaskEditListModal planId={planId} planItemId={planItem.id} opened={taskEditListModalOpened} closeModal={taskEditListModal.close} />
    </>
  );
};
