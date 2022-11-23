import { Stack } from '@mantine/core';
import { MutableRefObject } from 'react';
import { freeDaysDefinition, vacationDefinitions } from '../../../../../constants/vacations';
import { getWeekNumber } from '../../../../../helpers/time/get-week-number';
import { AppRouterTypes } from '../../../../../utils/trpc';
import { useNextLessonId } from '../use-next-lesson-id';
import { useVacationHighliters } from '../use-vacation-highlighter';
import { PlanSubjectWeekLessonItem } from './lessonItem';
import { PlanSubjectWeekVacationItem } from './vacationItem';

interface SemesterSubjectPlanListProps {
  lessons: AppRouterTypes['planItem']['getBySemesterId']['output'];
  vacations: typeof vacationDefinitions;
  subject: Exclude<AppRouterTypes['subject']['getByRouteName']['output'], null>;
  freeDays: typeof freeDaysDefinition;
  targetRef: MutableRefObject<HTMLDivElement>;
}

export const SemesterSubjectPlanList = ({ lessons, vacations, subject, freeDays, targetRef }: SemesterSubjectPlanListProps) => {
  const items = reduceVacationsAndLessons(lessons, vacations, freeDays);

  const nextLessonId = useNextLessonId(lessons);
  const nextVacation = useVacationHighliters(vacations);

  return (
    <Stack>
      {items.map((item) =>
        item.type === 'week' ? (
          <PlanSubjectWeekLessonItem item={item} nextId={nextLessonId} targetRef={targetRef} />
        ) : (
          <PlanSubjectWeekVacationItem
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
      freeDays
        .filter((fdd) => !vacationDefinitions.some((x) => x.start <= fdd.start && x.end > fdd.end))
        .filter((fdd) => !items.some((i) => getWeekNumber(i.date) === getWeekNumber(fdd.start)))
        .map((fdd) => ({
          type: 'week',
          week: getWeekNumber(fdd.start),
          year: fdd.start.getFullYear(),
          items: [],
          holidays: [fdd],
          sortBy: fdd.start,
        }))
    )
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

interface ReducedLesson {
  type: 'week';
  week: number;
  year: number;
  items: AppRouterTypes['planItem']['getBySemesterId']['output'];
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
