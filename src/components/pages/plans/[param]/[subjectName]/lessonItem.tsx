import { MutableRefObject } from 'react';
import { PlanHolidayItem } from '../../../../plan/item/holiday';
import { PlanLessonItem } from '../../../../plan/item/lesson';
import { ReducedSortableLesson } from './list';

interface PlanSubjectWeekLessonItemProps {
  item: ReducedSortableLesson;
  nextId?: string;
  targetRef: MutableRefObject<HTMLDivElement>;
}
export const PlanSubjectWeekLessonItem = ({ item: { items, holidays }, nextId, targetRef }: PlanSubjectWeekLessonItemProps) => {
  const containsNext = items.some((i) => i.id === nextId);
  return (
    <>
      {(
        items.map((i) => ({
          type: 'lesson',
          sortBy: i.date,
          ...i,
        })) as any[]
      )
        .concat(
          holidays.map((i) => ({
            type: 'holiday',
            sortBy: i.start,
            ...i,
          }))
        )
        .sort((a, b) => a.sortBy.getTime() - b.sortBy.getTime())
        .map((item) =>
          item.type === 'holiday' ? <PlanHolidayItem showKw {...item} /> : <PlanLessonItem key={item.id} item={item} isNext={containsNext} targetRef={containsNext ? targetRef : undefined} />
        )}
    </>
  );
};
