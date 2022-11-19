import { MutableRefObject } from 'react';
import { PlanLessonItem } from '../../../../plan/item/lesson';
import { ReducedSortableLesson } from './list';

interface PlanSubjectWeekLessonItemProps {
  item: ReducedSortableLesson;
  nextId?: string;
  targetRef: MutableRefObject<HTMLDivElement>;
}
export const PlanSubjectWeekLessonItem = ({ item: { week, items }, nextId, targetRef }: PlanSubjectWeekLessonItemProps) => {
  const containsNext = items.some((i) => i.id === nextId);
  return (
    <>
      {items.map((item, index) => (
        <PlanLessonItem key={item.id} item={item} isNext={containsNext} targetRef={containsNext ? targetRef : undefined} />
      ))}
    </>
  );
};
