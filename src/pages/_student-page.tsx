import { Badge, Card, Group, Stack, ThemeIcon, Text, Title, Tooltip, BackgroundImageProps, useMantineTheme } from '@mantine/core';
import { IconBook, IconClipboardCheck } from '@tabler/icons';
import { DashboardPlanList } from '../components/dashboard-plan-list';
import { DashboardPlanItemList } from '../components/dashboard-planitem-list';
import { TablerIconComponent } from '../components/tablerIcon';
import { formatDay } from '../helpers/time/format';
import { getWeekNumber } from '../helpers/time/get-week-number';
import { trpc } from '../utils/trpc';

export const StudentHomePage = () => {
  const { data: assessments } = trpc.assessment.getForDashboard.useQuery(undefined, {
    retry: false,
  });
  const { shadows, colorScheme } = useMantineTheme();
  const { data: subjects } = trpc.subject.getAll.useQuery();

  return (
    <Stack>
      <DashboardPlanList />
      <Title mt="sm" order={3}>
        Kommende Prüfungen
      </Title>
      <Stack>
        {assessments?.map((a) => {
          const subject = subjects?.find((s) => s.id === a.item.plan.subjectId);

          return (
            <Card
              withBorder
              shadow="md"
              style={{
                boxShadow: shadows.md.replaceAll(/rgba\((\d,\s){3}\d.\d{2}\)/g, shadowColors[a.badge.name as keyof typeof shadowColors]),
                color: colors[a.badge.name as keyof typeof colors][colorScheme],
              }}
            >
              <Group position="apart">
                <Group align="center" spacing="xs">
                  <Title order={3}>{getBadgeName(a.badge.name)}</Title>
                  {(a.evaluated || a.badge.name === 'exam') && (
                    <Tooltip label="Wird bewertet">
                      <ThemeIcon
                        style={{
                          color: 'inherit',
                          background: 'transparent',
                        }}
                      >
                        <IconClipboardCheck />
                      </ThemeIcon>
                    </Tooltip>
                  )}
                </Group>
                <Group>
                  <TablerIconComponent name={subject?.icon} />
                  <Title order={4}>{subject?.name}</Title>
                </Group>
              </Group>
              <Group position="apart">
                <Group>
                  <Text weight={500} color="dimmed">
                    KW {getWeekNumber(a.item.date)} - {formatDay(a.item.date)}
                  </Text>
                </Group>
              </Group>
            </Card>
          );
        })}
      </Stack>
      <Title mt="sm" order={3}>
        Kommende Termine
      </Title>
      <DashboardPlanItemList />
    </Stack>
  );
};

const getBadgeName = (name: string) => {
  if (name === 'exam') return 'Prüfung';
  if (name === 'presentation') return 'Präsentation';
  if (name === 'submission') return 'Abgabe';
};

const shadowColors = {
  exam: 'rgba(25, 113, 194, 0.2)',
  submission: 'rgba(224, 49, 49, 0.2)',
  presentation: 'rgba(232, 89, 12, 0.2)',
};

const colors = {
  exam: { dark: '#a5d8ff', light: '#228be6' },
  submission: { dark: '#ffc9c9', light: '#fa5252' },
  presentation: { dark: '#ffd8a8', light: '#fd7e14' },
};
