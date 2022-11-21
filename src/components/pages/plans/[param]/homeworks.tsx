import { useDisclosure } from '@mantine/hooks';
import { AppRouterTypes } from '../../../../utils/trpc';
import { PlanItemHomeworkBase } from '../../../plan/item/homeworks';
import { HomeworkListModal } from '../../../plan/item/homeworks/list-modal';

interface PlanItemHomeworksProps {
  planItem: AppRouterTypes['planItem']['getBySemesterId']['output'][0];
}

export const PlanItemHomeworks = ({ planItem }: PlanItemHomeworksProps) => {
  const [homeworkModalOpened, homeworkModal] = useDisclosure(false);
  const onHomeworkClick = () => {};

  return (
    <>
      <PlanItemHomeworkBase type="read" onHomeworkClick={onHomeworkClick} onHomeworksClick={homeworkModal.open} homework={planItem.homework} />
      <HomeworkListModal opened={homeworkModalOpened} closeModal={homeworkModal.close} planItemId={planItem.id} />
    </>
  );
};
