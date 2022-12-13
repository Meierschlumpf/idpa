import { ActionIcon, Box, Burger, Button, createStyles, Divider, Group, Header, Paper, Select, Stack, Text, Tooltip, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { IconArrowLoopRight, IconMoon, IconRefresh, IconSchool, IconSun } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../stores/auth-store';
import { useThemeStore } from '../../stores/theme-store';
import { trpc } from '../../utils/trpc';
import { StudentHeaderNavigation } from './header/variant/student';
import { TeacherHeaderNavigation } from './header/variant/teacher';

const HEADER_HEIGHT = 60;

interface BasicHeaderProps {
  navbarOpened: boolean;
  toggleNavbar: () => void;
}

export const BasicHeader = ({}: BasicHeaderProps) => {
  const role = useAuthStore((x) => x.role);
  const setRole = useAuthStore((x) => x.setRole);
  const setTheme = useThemeStore((x) => x.setTheme);
  const theme = useThemeStore((x) => x.theme);
  const [burgerOpened, burger] = useDisclosure(false);
  const { classes } = useStyles();
  const router = useRouter();
  const { mutateAsync: resetStudentAsync, isLoading: isStudentLoading } = trpc.reset.student.useMutation();
  const { mutateAsync: resetTeacherAsync, isLoading: isTeacherLoading } = trpc.reset.teacher.useMutation();

  const resetData = () => {
    const mutateAsync = role === 'student' ? resetStudentAsync : resetTeacherAsync;
    mutateAsync().then(() => {
      router.push('/');
    });
  };

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
    <Box>
      <Header height={HEADER_HEIGHT} px="md" className={classes.root}>
        <Group position="apart" sx={{ height: '100%' }} spacing={0}>
          <NextLink href="/">
            <Group>
              <Burger opened={burgerOpened} onClick={burger.toggle} className={classes.burger} />
              <IconSchool size={30} />
              <Text weight={500} size={30}>
                IDPA
              </Text>
            </Group>
          </NextLink>

          <Group sx={{ height: '100%' }} className={classes.links} spacing={0}>
            {role === 'student' ? <StudentHeaderNavigation /> : <TeacherHeaderNavigation />}
          </Group>

          <Transition transition="pop-top-right" duration={200} mounted={burgerOpened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                <Stack spacing="xs">
                  <Stack spacing={0}>{role === 'student' ? <StudentHeaderNavigation /> : <TeacherHeaderNavigation />}</Stack>
                  <Divider p={0} mx="md" />
                  <Button onClick={resetData} loading={isStudentLoading || isTeacherLoading}>
                    Daten zurücksetzen
                  </Button>
                  <Select
                    mt={0}
                    m="md"
                    withinPortal
                    label="Rolle anpassen"
                    value={role}
                    data={[
                      { value: 'student', label: 'Schüler/-in' },
                      { value: 'teacher', label: 'Lehrperson' },
                    ]}
                    onChange={handleRoleChange}
                    className={classes.dropdownSelect}
                  />
                </Stack>
              </Paper>
            )}
          </Transition>

          <Group>
            <Tooltip label="Daten zurücksetzen">
              <ActionIcon color="red" variant="light" onClick={resetData} loading={isStudentLoading || isTeacherLoading}>
                <IconRefresh size={16} stroke={1.5} />
              </ActionIcon>
            </Tooltip>

            <Select
              withinPortal
              value={role}
              data={[
                { value: 'student', label: 'Schüler/-in' },
                { value: 'teacher', label: 'Lehrperson' },
              ]}
              onChange={handleRoleChange}
              className={classes.select}
            />
            <ActionIcon
              variant="default"
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              size="lg"
            >
              {theme === 'light' ? <IconMoon stroke={1.5} /> : <IconSun stroke={1.5} />}
            </ActionIcon>
          </Group>
        </Group>
      </Header>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  select: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  dropdownSelect: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },
}));
