import { ActionIcon, Card, Group, Stack, Text, Tooltip, UnstyledButton, useMantineTheme } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { IconPencil } from '@tabler/icons';
import { MouseEvent } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { AppRouterTypes } from '../utils/trpc';
import { TablerIconComponent } from './tablerIcon';

interface PlanDashboardItemProps {
  plan: AppRouterTypes['plan']['getForDashboard']['output'][0];
  showSemester?: boolean;
  current?: boolean;
}

export const PlanDashboardItem = ({ plan, showSemester = true, current = false }: PlanDashboardItemProps) => {
  const { colors, colorScheme } = useMantineTheme();
  const role = useAuthStore((x) => x.role);
  const { shadows } = useMantineTheme();

  const inner = (
    <Card
      withBorder
      style={{ width: '100%', height: '100%', borderColor: current ? 'rgba(25, 113, 194, 0.7)' : undefined }}
      sx={
        role === 'student'
          ? {
              ':hover': {
                backgroundColor: colorScheme === 'dark' ? colors.dark[5] : colors.gray[1],
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
            {showSemester && (
              <Text size="sm" color="dimmed">
                {plan.semesterId}
              </Text>
            )}
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
