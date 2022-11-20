import { createStyles, UnstyledButton } from '@mantine/core';
import { NextLink } from '@mantine/next';

interface HeaderLinkProps {
  label: string;
  href: string;
  disabled?: boolean;
}

export const HeaderLink = ({ label, href, disabled = false }: HeaderLinkProps) => {
  const { classes } = useStyles();

  if (disabled) {
    return (
      <UnstyledButton disabled={disabled} className={classes.link}>
        {label}
      </UnstyledButton>
    );
  }

  return (
    <UnstyledButton component={NextLink} href={href} className={classes.link}>
      {label}
    </UnstyledButton>
  );
};

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },
}));
