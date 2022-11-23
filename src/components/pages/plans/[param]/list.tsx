import { Stack } from '@mantine/core';
import { RefObject } from 'react';
import { freeDaysDefinition, vacationDefinitions } from '../../../../constants/vacations';
import { getWeekNumber } from '../../../../helpers/time/get-week-number';
import { AppRouterTypes } from '../../../../utils/trpc';
import { PlanWeekLessonItem } from './lessonsItem';
import { useNextLessonId } from './use-next-lesson-id';
import { useVacationHighliters } from './use-vacation-highlighter';
import { PlanWeekVacationItem } from './vacationItem';

interface SemesterPlanListProps {
  lessons: AppRouterTypes['planItem']['getBySemesterId']['output'];
  vacations: typeof vacationDefinitions;
  freeDays: typeof freeDaysDefinition;
  targetRef?: RefObject<HTMLDivElement>;
}

export const SemesterPlanList = ({ lessons, vacations, freeDays, targetRef }: SemesterPlanListProps) => {
  const items = reduceVacationsAndLessons(lessons, vacations, freeDays);

  const nextLessonId = useNextLessonId(lessons);
  const nextVacation = useVacationHighliters(vacations);

  return (
    <Stack>
      {items.map((item) =>
        item.type === 'week' ? (
          <PlanWeekLessonItem item={item} nextId={nextLessonId} targetRef={targetRef} />
        ) : (
          <PlanWeekVacationItem
            isNext={!nextVacation.current && nextVacation.nextStart === item.item.start.getTime()}
            isCurrent={nextVacation.current && nextVacation.nextEnd === item.item.end.getTime()}
            {...item.item}
          />
        )
      )}
    </Stack>
  );
};

const reduceVacationsAndLessons = (items: AppRouterTypes['planItem']['getBySemesterId']['output'], vacations: typeof vacationDefinitions, freeDays: typeof freeDaysDefinition) => {
  const weekItems = items
    .reduce((list: ReducedLesson[], item) => {
      const itemYear = item.date.getFullYear();
      const itemWeek = getWeekNumber(item.date);
      const index = list.findIndex((x) => x.year == itemYear && x.week == itemWeek);
      if (index !== -1) {
        list[index]!.items.push(item);
        return list;
      }
      list.push({
        type: 'week',
        week: itemWeek,
        year: itemYear,
        items: [item],
        holidays: freeDays.filter((fdd) => getWeekNumber(fdd.start) == itemWeek),
      });
      return list;
    }, [])
    .map((item) => ({
      ...item,
      items: item.items.sort((a, b) => a.date.getTime() - b.date.getTime()),
      sortBy: item.items.at(0)!.date,
    })) as ReducedVacationAndLesson[];
  return weekItems
    .concat(
      vacations.map((v) => ({
        type: 'vacation',
        item: v,
        sortBy: v.start,
      }))
    )
    .sort((a, b) => a.sortBy.getTime() - b.sortBy.getTime());
};

interface ReducedLesson {
  type: 'week';
  week: number;
  year: number;
  items: AppRouterTypes['planItem']['getBySemesterId']['output'];
  holidays: typeof freeDaysDefinition;
}

export interface ReducedSortableLesson extends ReducedLesson {
  sortBy: Date;
}

type ReducedVacationAndLesson =
  | ReducedSortableLesson
  | {
      type: 'vacation';
      sortBy: Date;
      item: typeof vacationDefinitions[0];
    };
