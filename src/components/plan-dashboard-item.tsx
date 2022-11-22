import { ActionIcon, Card, Group, Stack, Text, Tooltip, UnstyledButton, useMantineTheme } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { IconPencil } from '@tabler/icons';
import { MouseEvent } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { AppRouterTypes } from '../utils/trpc';
import { TablerIconComponent } from './tablerIcon';

interface PlanDashboardItemProps {
  plan: AppRouterTypes['plan']['getForDashboard']['output'][0];
}

export const PlanDashboardItem = ({ plan }: PlanDashboardItemProps) => {
  const { colors, colorScheme } = useMantineTheme();
  const role = useAuthStore((x) => x.role);

  const inner = (
    <Card
      style={{ width: '100%', height: '100%' }}
      sx={
        role === 'student'
          ? {
              ':hover': {
                backgroundColor: colorScheme === 'dark' ? colors.dark[5] : colors.gray[3],
              },
              ':active': {
                transform: 'translateY(2px)',
              },
            }
          : undefined
      }
    >
      <Group position="apart">
        <Group>
          <TablerIconComponent name={plan.subject.icon} />
          <Stack spacing={0}>
            <Text weight={500}>{plan.subject.name}</Text>
            <Text size="sm" color="dimmed">
              {plan.semesterId}
            </Text>
          </Stack>
        </Group>
        {role === 'teacher' ? (
          <Tooltip label="Plan bearbeiten" withinPortal>
            <ActionIcon component={NextLink} href={`/plans/${plan.id}/edit`}>
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        ) : null}
      </Group>
    </Card>
  );

  if (role === 'teacher') {
    return inner;
  }
  return (
    <UnstyledButton style={{ width: '100%', height: '100%' }} component={NextLink} href={`/plans/${plan.semesterId}/${plan.subject.routeName}`}>
      {inner}
    </UnstyledButton>
  );
};
