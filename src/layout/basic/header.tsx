import { ActionIcon, Box, Group, Header, Select, Text } from '@mantine/core';
import { IconMoon, IconSchool, IconSun } from '@tabler/icons';
import { useAuthStore } from '../../stores/auth-store';
import { useThemeStore } from '../../stores/theme-store';
import { trpc } from '../../utils/trpc';
import { StudentHeaderNavigation } from './header/variant/student';
import { TeacherHeaderNavigation } from './header/variant/teacher';

interface BasicHeaderProps {
  navbarOpened: boolean;
  toggleNavbar: () => void;
}

export const BasicHeader = ({}: BasicHeaderProps) => {
  const role = useAuthStore((x) => x.role);
  const setRole = useAuthStore((x) => x.setRole);
  const setTheme = useThemeStore((x) => x.setTheme);
  const theme = useThemeStore((x) => x.theme);

  const { mutateAsync } = trpc.activeRole.update.useMutation();

  const handleRoleChange = async (newRole: 'student' | 'teacher' | null) => {
    if (!newRole) return;

    const previousRole = role;
    setRole(newRole);
    await mutateAsync(
      { name: newRole },
      {
        onError() {
          setRole(previousRole);
        },
      }
    );
  };

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
            <Select withinPortal value={role} data={['student', 'teacher']} onChange={handleRoleChange} />
            <ActionIcon
              variant="default"
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              size="lg"
            >
              {theme === 'dark' ? <IconMoon /> : <IconSun />}
            </ActionIcon>
          </Group>
        </Group>
      </Header>
    </Box>
  );
};
