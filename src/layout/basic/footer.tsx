import { Anchor, Footer, Group, Text, UnstyledButton } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { IconExternalLink, IconLink } from '@tabler/icons';

export const BasicFooter = () => {
  return (
    <Footer height={60} p="md">
      <Group position="apart">
        <Group align="center" spacing="xs">
          <Text weight={500}>Build with 💖 by Meierschlumpf</Text>
          <a href="https://github.com/Meierschlumpf" target="_blank">
            <IconExternalLink />
          </a>
        </Group>
        <Group align="center" spacing="xs">
          <Text weight={500}>Impressum</Text>
          <UnstyledButton
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
            component={NextLink}
            href="/impressum"
          >
            <IconLink />
          </UnstyledButton>
        </Group>
      </Group>
    </Footer>
  );
};
