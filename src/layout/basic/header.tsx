import { Box, Group, Header, Select, Text } from '@mantine/core';
import { IconSchool } from '@tabler/icons';
import { useAuthStore } from '../../stores/auth-store';
import { StudentHeaderNavigation } from './header/variant/student';
import { TeacherHeaderNavigation } from './header/variant/teacher';

interface BasicHeaderProps {
  navbarOpened: boolean;
  toggleNavbar: () => void;
}

export const BasicHeader = ({}: BasicHeaderProps) => {
  const role = useAuthStore((x) => x.role);
  const setRole = useAuthStore((x) => x.setRole);

  return (
    <Box pb={60}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group>
            <IconSchool size={30} />
            <Text weight={500} size={30}>
              IDPA
            </Text>
          </Group>

          <Group sx={{ height: '100%' }} spacing={0}>
            {role === 'student' ? <StudentHeaderNavigation /> : <TeacherHeaderNavigation />}
          </Group>

          <Group>
            <Select withinPortal value={role} data={['student', 'teacher']} onChange={(v) => setRole(v ?? 'student')} />
          </Group>
        </Group>
      </Header>
    </Box>
  );
};
