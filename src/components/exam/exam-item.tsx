import { Card, Group, Title, Tooltip, ThemeIcon, Text } from '@mantine/core';
import { IconBook, IconClipboardCheck } from '@tabler/icons';

export const ExamItem = () => {
  return (
    <Card>
      <Group position="apart">
        <Group align="center" spacing="xs">
          <Title order={3}>Prüfung</Title>
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
        </Group>
        <Group>
          <IconBook />
          <Title order={4}>Deutsch</Title>
        </Group>
      </Group>
      <Group position="apart">
        <Group>
          <Text weight={500} color="dimmed">
            KW 05 - 31. Jan. 2023
          </Text>
        </Group>
      </Group>
    </Card>
  );
};
