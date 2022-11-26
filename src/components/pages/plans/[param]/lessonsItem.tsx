import { Stack, Title } from '@mantine/core';
import { MutableRefObject, RefObject } from 'react';
import { trpc } from '../../../../utils/trpc';
import { PlanHolidayItem } from '../../../plan/item/holiday';
import { PlanLessonItem } from '../../../plan/item/lesson';
import { ReducedSortableLesson } from './list';

interface PlanWeekItemProps {
  item: ReducedSortableLesson;
  nextId?: string;
  targetRef?: RefObject<HTMLDivElement>;
}
export const PlanWeekLessonItem = ({ item: { week, items, holidays }, nextId, targetRef }: PlanWeekItemProps) => {
  const { data: subjects } = trpc.subject.getAll.useQuery();
  const containsNext = items.some((i) => i.id === nextId);
  return (
    <Stack mt="lg" spacing="sm">
      <Title order={3}>KW {week}</Title>
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
        .map((item, index) =>
          item.type === 'lesson' ? (
            <PlanLessonItem
              key={item.id}
              item={item}
              isNext={containsNext && index === 0}
              targetRef={containsNext && index === 0 ? (targetRef as MutableRefObject<HTMLElement>) : undefined}
              subject={subjects?.find((s) => s.id === item.subjectId)}
              showKw={false}
            />
          ) : (
            <PlanHolidayItem {...item} />
          )
        )}
    </Stack>
  );
};
