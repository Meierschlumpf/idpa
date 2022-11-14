import { useDisclosure } from '@mantine/hooks';
import { PlanItemTaskBase } from '../../../../plan/item/tasks';
import { TaskEditListModal } from './task-edit-list-modal';

interface EditPlanItemTasksProps {
  planItemId: string;
  planId: string;
}

export const EditPlanItemTasks = ({ planId, planItemId }: EditPlanItemTasksProps) => {
  const [taskEditListModalOpened, taskEditListModal] = useDisclosure(false);
  const onHomeworkClick = () => {};

  return (
    <>
      <PlanItemTaskBase type="write" onHomeworkClick={onHomeworkClick} onTasksClick={taskEditListModal.open} />
      <TaskEditListModal planId={planId} planItemId={planItemId} opened={taskEditListModalOpened} closeModal={taskEditListModal.close} />
    </>
  );
};
