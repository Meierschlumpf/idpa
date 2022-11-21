import { Box, Group, NavLink, Title, useMantineTheme } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { IconAlignLeft, IconCalendarEvent, IconExternalLink } from '@tabler/icons';
import { trpc } from '../../utils/trpc';
import { TablerIconComponent } from '../tablerIcon';

interface PlanSidebarProps {
  activeSemesterId?: string;
  activeSubjectId?: string;
}

export const PlanSidebar = ({ activeSemesterId, activeSubjectId }: PlanSidebarProps) => {
	const {colors} = useMantineTheme();
	const activeColor = colors.blue[5];
  const { data: semesters } = trpc.semester.getAllWithSubjects.useQuery();

  return (
    <>
      <Group>
        <IconCalendarEvent />
        <Title order={5}>Pläne</Title>
      </Group>

      <Box sx={{ width: 240 }} mt="sm">
        {semesters?.map((sem) => (
          <NavLink key={sem.id} label={sem.id} childrenOffset={28} defaultOpened={activeSemesterId == sem.id}>
            <NavLink label="Übersicht" icon={<IconAlignLeft color={activeSemesterId == sem.id && !activeSubjectId ? activeColor : undefined} />} component={NextLink} href={`/plans/${sem.id}`} />
            {sem.plans.map((pl) => (
              <NavLink
                key={pl.id}
                label={pl.subject.name}
                icon={<TablerIconComponent name={pl.subject.icon} color={activeSemesterId == sem.id && activeSubjectId == pl.subjectId ? activeColor : undefined} />}
                component={NextLink}
                href={`/plans/${sem.id}/${pl.subject.routeName}`}
              />
            ))}
          </NavLink>
        ))}
      </Box>
    </>
  );
};
