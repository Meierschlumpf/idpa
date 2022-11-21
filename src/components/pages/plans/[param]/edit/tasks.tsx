import { useDisclosure } from '@mantine/hooks';
import { AppRouterTypes } from '../../../../../utils/trpc';
import { PlanItemTaskBase } from '../../../../plan/item/tasks';
import { HomeworkEditListModal } from './homework-edit-list-modal';
import { TaskEditListModal } from './task-edit-list-modal';

interface EditPlanItemTasksProps {
  planItem: Exclude<AppRouterTypes['planItem']['getByPlanId']['output'], undefined>[0];
  planId: string;
}

export const EditPlanItemTasks = ({ planId, planItem }: EditPlanItemTasksProps) => {
  const [taskEditListModalOpened, taskEditListModal] = useDisclosure(false);
  const [homeworkEditListModalOpened, homeworkEditListModal] = useDisclosure(false);

  return (
    <>
      <PlanItemTaskBase type="write" onHomeworkClick={homeworkEditListModal.open} onTasksClick={taskEditListModal.open} homework={planItem.homework} task={planItem.task} />
      <TaskEditListModal planId={planId} planItemId={planItem.id} opened={taskEditListModalOpened} closeModal={taskEditListModal.close} />
      <HomeworkEditListModal planId={planId} planItemId={planItem.id} opened={homeworkEditListModalOpened} closeModal={homeworkEditListModal.close} />
    </>
  );
};
