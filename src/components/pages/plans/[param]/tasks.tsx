import { useDisclosure } from '@mantine/hooks';
import { AppRouterTypes } from '../../../../utils/trpc';
import { HomeworkListModal } from '../../../plan/item/homeworks/list-modal';
import { PlanItemTaskBase } from '../../../plan/item/tasks';
import { TaskListModal } from '../../../plan/item/tasks/list-modal';

interface PlanItemTasksProps {
  planItem: AppRouterTypes['planItem']['getBySemesterId']['output'][0];
}

export const PlanItemTasks = ({ planItem }: PlanItemTasksProps) => {
  const [taskModalOpened, taskModal] = useDisclosure(false);
  const [homeworkModalOpened, homeworkModal] = useDisclosure(false);

  return (
    <>
      <PlanItemTaskBase type="read" onHomeworkClick={homeworkModal.open} onTasksClick={taskModal.open} task={planItem.task} homework={planItem.homework} />
      {taskModalOpened && <TaskListModal opened={taskModalOpened} closeModal={taskModal.close} planItemId={planItem.id} />}
      {homeworkModalOpened && <HomeworkListModal opened={homeworkModalOpened} closeModal={homeworkModal.close} planItemId={planItem.id} />}
    </>
  );
};
