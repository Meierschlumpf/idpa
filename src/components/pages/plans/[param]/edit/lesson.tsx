import { Button, Card, Group, Stack, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { RefObject } from 'react';
import { IconCheckbox, IconHomeCheck } from '@tabler/icons';
import { showSuccessNotification } from '../../../../../helpers/notifications/success';
import { AppRouterTypes, trpc } from '../../../../../utils/trpc';
import { BadgeList } from '../../../../plan/item/badge/list';
import { PlanItemEditMenu } from '../../../../plan/item/edit-menu';
import { PlanLessonItemNextText } from '../../../../plan/item/next';
import { PlanLessonItemTitle } from '../../../../plan/item/title';
import { PlanItemTaskBase } from '../../../../plan/item/tasks';
import { EditPlanItemTasks } from './tasks';
import { useDisclosure } from '@mantine/hooks';

export interface PlanEditLessonItemProps {
  item: Exclude<AppRouterTypes['planItem']['getByPlanId']['output'], undefined>[0];
  targetRef?: RefObject<HTMLDivElement>;
  isNext?: boolean;
}
export const PlanEditLessonItem = ({ item, targetRef, isNext }: PlanEditLessonItemProps) => {
  const theme = useMantineTheme();
  const utils = trpc.useContext();
  const addBadge = trpc.planItem.addBadge.useMutation();
  const removeBadge = trpc.planItem.removeBadge.useMutation();
  const changeBadgeEvaluation = trpc.planItem.changeBadgeEvaluation.useMutation();

  const invalidatePlanItems = () => {
    utils.planItem.getAll.invalidate();
    utils.planItem.getBySubjectId.invalidate();
    utils.planItem.getByPlanId.invalidate();
  };
  const handleAddition = async (badgeId: string) => {
    await addBadge.mutateAsync(
      { itemId: item.id, badgeId },
      {
        onSuccess() {
          invalidatePlanItems();
          showSuccessNotification({
            title: 'Badge hinzugefügt',
            message: 'Der Badge wurde erfolgreich hinzugefügt!',
          });
        },
      }
    );
  };

  const handleRemoval = async (badgeId: string) => {
    await removeBadge.mutateAsync(
      { itemId: item.id, badgeId },
      {
        onSuccess() {
          invalidatePlanItems();
          showSuccessNotification({
            title: 'Badge entfernt',
            message: 'Der Badge wurde erfolgreich entfernt!',
          });
        },
      }
    );
  };

  const handleSwitch = async (badgeId: string, evaluated: boolean) => {
    await changeBadgeEvaluation.mutateAsync(
      { itemId: item.id, badgeId, evaluated },
      {
        onSuccess() {
          invalidatePlanItems();
          showSuccessNotification({
            title: `Bewertung ${evaluated ? 'hinzugefügt' : 'entfernt'}`,
            message: `Die Bewertung wurde erfolgreich ${evaluated ? 'hinzugefügt' : 'entfernt'}!`,
          });
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
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
    >
      <PlanLessonItemNextText visible={isNext} targetRef={targetRef} date={item.date} />
      <Stack>
        <Group position="apart" align="center">
          <PlanLessonItemTitle date={item.date} theme={item.title} />

          <PlanItemEditMenu item={item} />
        </Group>
        {item.description && (
          <Group>
            <Text>{item.description}</Text>
          </Group>
        )}
        <Group position="apart">
          <BadgeList mode="write" activeBadges={item.badges} handleSwitch={handleSwitch} handleAddition={handleAddition} handleRemoval={handleRemoval} />
          <EditPlanItemTasks />
        </Group>
      </Stack>
    </Card>
  );
};
