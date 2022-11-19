import { Card, Group, Stack, Text, Title, TypographyStylesProvider, useMantineTheme } from '@mantine/core';
import { MutableRefObject, RefObject } from 'react';
import { getWeekNumber } from '../../../helpers/time/get-week-number';
import { AppRouterTypes, trpc } from '../../../utils/trpc';
import { PlanItemTasks } from '../../pages/plans/[param]/tasks';
import { TablerIconComponent } from '../../tablerIcon';
import { BadgeList } from './badge/list';
import { ItemDescription } from './description';
import getHtml from './dynamic-to-html-button';
import { PlanItemEditMenu } from './edit-menu';

export interface PlanLessonItemProps {
  subject?: { id: string; name: string; icon: string };
  item: AppRouterTypes['planItem']['getBySemesterId']['output'][0];
  showKw?: boolean;
  targetRef?: MutableRefObject<HTMLElement>;
  isNext?: boolean;
  mode?: 'read' | 'write';
}

export const PlanLessonItem = ({ subject, item, showKw = true, targetRef, isNext, mode }: PlanLessonItemProps) => {
  const theme = useMantineTheme();
  const week = getWeekNumber(item.date);
  const utils = trpc.useContext();
  const addBadge = trpc.planItem.addBadge.useMutation();
  const removeBadge = trpc.planItem.removeBadge.useMutation();
  const changeBadgeEvaluation = trpc.planItem.changeBadgeEvaluation.useMutation();

  const handleAddition = async (badgeId: string) => {
    await addBadge.mutateAsync(
      { itemId: item.id, badgeId },
      {
        onSuccess() {
          utils.planItem.getAll.invalidate();
          utils.planItem.getBySubjectId.invalidate();
          utils.planItem.getByPlanId.invalidate();
        },
      }
    );
  };

  const handleRemoval = async (badgeId: string) => {
    await removeBadge.mutateAsync(
      { itemId: item.id, badgeId },
      {
        onSuccess() {
          utils.planItem.getAll.invalidate();
          utils.planItem.getBySubjectId.invalidate();
          utils.planItem.getByPlanId.invalidate();
        },
      }
    );
  };

  const handleSwitch = async (badgeId: string, evaluated: boolean) => {
    await changeBadgeEvaluation.mutateAsync(
      { itemId: item.id, badgeId, evaluated },
      {
        onSuccess() {
          utils.planItem.getAll.invalidate();
          utils.planItem.getBySubjectId.invalidate();
          utils.planItem.getByPlanId.invalidate();
        },
      }
    );
  };

  return (
    <Card
      mt={isNext ? 20 : undefined}
      style={{
        borderColor: isNext ? theme.colors.blue[5] : undefined,
        overflow: 'visible',
      }}
      ref={targetRef as RefObject<HTMLDivElement>}
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
    >
      {isNext && (
        <Text
          style={{
            position: 'absolute',
            top: -24,
            left: 0,
            color: theme.colors.blue[5],
          }}
        >
          {getNextDate(item.date)}
        </Text>
      )}
      <Stack>
        <Group position="apart" align="center">
          <Title order={3}>
            {showKw && `KW ${week} - `}
            {item.title}
          </Title>
          {subject && mode !== 'write' && (
            <Group align="center">
              <TablerIconComponent name={subject.icon} />
              <Title order={4}>{subject.name}</Title>
            </Group>
          )}
        </Group>
        {item.description && (
          <Group>
            <ItemDescription description={item.description} />
          </Group>
        )}
        <Group position={item.badges.length === 0 ? 'right' : 'apart'}>
          <BadgeList mode={mode} activeBadges={item.badges} handleSwitch={handleSwitch} handleAddition={handleAddition} handleRemoval={handleRemoval} />
          <PlanItemTasks planItem={item} />
        </Group>
      </Stack>
    </Card>
  );
};

// TODO: move to helper function

const isTomorrow = (date: Date) => {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return tomorrow.getFullYear() === date.getFullYear() && tomorrow.getMonth() === date.getMonth() && tomorrow.getDate() === date.getDate();
};

const isToday = (date: Date) => {
  const now = new Date();
  return now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate();
};

const getNextDate = (date: Date) => {
  const now = new Date();
  const today = new Date();
  const week = 1000 * 3600 * 24 * 7;
  const inOneWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8);
  const difference = Math.floor((date.getTime() - today.getTime()) / week);
  return date > inOneWeek ? (difference === 1 ? 'In einer Woche' : `In ${difference} Wochen`) : isToday(date) ? `Heute` : isTomorrow(date) ? 'Morgen' : `Nächsten ${days[date.getDay()]}`;
};

const days = ['Sonntag', 'Montag', 'Dienstag', 'Mitwoch', 'Donnerstag', 'Freitag', 'Samstag'];
