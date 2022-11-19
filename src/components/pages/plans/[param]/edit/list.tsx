import { Center, ScrollArea, Stack, Text } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { MutableRefObject, RefObject } from 'react';
import { vacationDefinitions } from '../../../../../constants/vacations';
import { AppRouterTypes, trpc } from '../../../../../utils/trpc';
import { PlanEditItem, PlanEditItemMapperProps } from './item';

interface PlanEditListProps {
  plan: Exclude<AppRouterTypes['plan']['getById']['output'], null | undefined>;
  scrollableRef: MutableRefObject<null>;
  targetRef: MutableRefObject<HTMLElement>;
}

export const PlanEditList = ({ plan, scrollableRef, targetRef }: PlanEditListProps) => {
  const { data: planItems } = trpc.planItem.getByPlanId.useQuery({ planId: plan.id });

  const vacations = vacationDefinitions.filter((x) => x.end >= plan.semester.start && x.start <= plan.semester.end);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nextLessonId = planItems?.filter((x) => x.date.getTime() >= today.getTime()).sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.id;
  const nextVacationStart = vacations
    .filter((x) => x.start.getTime() >= today.getTime() + 1000 * 60 * 60 * 24 * 3)
    .sort((a, b) => a.start.getTime() - b.start.getTime())[0]
    ?.start.getTime();
  const currentlyInVacation = vacations.some((v) => v.start.getTime() <= today.getTime() + 1000 * 60 * 60 * 24 * 3 && v.end.getTime() >= today.getTime() - 1000 * 60 * 60 * 24);
  const nextVacationEnd = vacations
    .filter((x) => x.end.getTime() >= today.getTime() - 1000 * 60 * 60 * 24)
    .sort((a, b) => a.end.getTime() - b.end.getTime())[0]
    ?.end.getTime();

  return (
    <ScrollArea
      mt="xl"
      styles={{
        viewport: {
          maxHeight: 'calc(100vh - 300px)',
          width: 'calc(100% - 14px)',
        },
      }}
      viewportRef={scrollableRef}
    >
      <Stack>
        {planItems?.length === 0 && (
          <Center>
            <Text weight={500}>Es wurden keine Elemente gefunden</Text>
          </Center>
        )}
        {(
          planItems?.map((item) => ({
            type: 'lesson',
            props: {
              planId: plan.id,
              item,
              isNext: nextLessonId === item.id,
              targetRef: nextLessonId === item.id ? (targetRef as RefObject<HTMLDivElement>) : undefined,
            },
            sortBy: item.date,
          })) as PlanEditItemMapperProps[]
        )
          .concat(
            vacations.map((vacation) => ({
              type: 'vacation',
              props: {
                ...vacation,
                isNext: !currentlyInVacation && nextVacationStart === vacation.start.getTime(),
                isCurrent: currentlyInVacation && nextVacationEnd === vacation.end.getTime(),
              },
              sortBy: vacation.start,
            }))
          )
          .sort((a, b) => a.sortBy.getTime() - b.sortBy.getTime())
          .map((props, key) => (
            <PlanEditItem key={key} {...props} />
          ))}
      </Stack>
    </ScrollArea>
  );
};
