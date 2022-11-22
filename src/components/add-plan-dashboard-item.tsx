import { Card, Center, UnstyledButton, useMantineTheme } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { IconPlus } from '@tabler/icons';

export const AddPlanDashboardItem = () => {
  const { colors, colorScheme } = useMantineTheme();

  return (
    <UnstyledButton style={{ width: '100%', height: '100%' }} component={NextLink} href={`/plans/create`}>
      <Card
        style={{ width: '100%', height: '100%' }}
        sx={{
          ':hover': {
            backgroundColor: colorScheme === 'dark' ? colors.dark[5] : colors.gray[3],
          },
          ':active': {
            transform: 'translateY(2px)',
          },
        }}
      >
        <Center style={{ height: '100%' }}>
          <IconPlus size={30} stroke={1.5} />
        </Center>
      </Card>
    </UnstyledButton>
  );
};
