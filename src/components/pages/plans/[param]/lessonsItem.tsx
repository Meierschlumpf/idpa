import { Stack, Title } from '@mantine/core';
import { RefObject } from 'react';
import { trpc } from '../../../../utils/trpc';
import { PlanLessonItem } from '../../../plan/item/lesson';
import { ReducedSortableLesson } from './list';

interface PlanWeekItemProps {
  item: ReducedSortableLesson;
  nextId?: string;
  targetRef: RefObject<HTMLDivElement>;
}
export const PlanWeekLessonItem = ({ item: { week, items }, nextId, targetRef }: PlanWeekItemProps) => {
  const { data: subjects } = trpc.subject.getAll.useQuery();
  const containsNext = items.some((i) => i.id === nextId);
  return (
    <Stack mt="lg" spacing="sm">
      <Title order={3}>KW {week}</Title>
      {items.map((item, index) => (
        <PlanLessonItem
          key={item.id}
          item={item}
          isNext={containsNext && index === 0}
          targetRef={containsNext && index === 0 ? targetRef : undefined}
          subject={subjects?.find((s) => s.id === item.subjectId)}
          showKw={false}
        />
      ))}
    </Stack>
  );
};
