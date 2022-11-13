import { useDisclosure } from '@mantine/hooks';
import { PlanItemTaskBase } from '../../../../plan/item/tasks';
import { TaskEditListModal } from './task-edit-list-modal';

export const EditPlanItemTasks = () => {
  const [taskEditListModalOpened, taskEditListModal] = useDisclosure(false);
  const onHomeworkClick = () => {};

  return (
    <>
      <PlanItemTaskBase type="write" onHomeworkClick={onHomeworkClick} onTasksClick={taskEditListModal.open} />
      <TaskEditListModal opened={taskEditListModalOpened} closeModal={taskEditListModal.close} />
    </>
  );
};
