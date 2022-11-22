import { createStyles, UnstyledButton } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';

interface HeaderLinkProps {
  label: string;
  href: string;
  disabled?: boolean;
}

export const HeaderLink = ({ label, href, disabled = false }: HeaderLinkProps) => {
  const { classes, cx } = useStyles();
  const { asPath } = useRouter();

  if (disabled) {
    return (
      <UnstyledButton disabled={disabled} className={classes.link}>
        {label}
      </UnstyledButton>
    );
  }

  const isActive = asPath === href;

  return (
    <UnstyledButton component={NextLink} href={href} className={cx(classes.link, isActive ? classes.activeLink : undefined)}>
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

  activeLink: {
    color: theme.colors.blue[4],
  },
}));
