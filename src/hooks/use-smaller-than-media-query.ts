import { MantineSize, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const useLargerThanMediaQuery = (size: MantineSize) => {
  const { breakpoints } = useMantineTheme();
  return useMediaQuery(`(min-width: ${breakpoints[size]}px)`);
};
