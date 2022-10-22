import { createStyles, Navbar, ScrollArea } from '@mantine/core';
import { Icon123 } from '@tabler/icons';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';
import { LinksGroup } from '../links-group';

export const PlansSidebar = () => {
	const { classes } = useStyles();
	const router = useRouter();
	const { data } = trpc.subject.getSidebar.useQuery();

	const links = data?.map((c) => <LinksGroup icon={Icon123} label={c.name} link={`/plans/${c.name.toLowerCase()}`} initiallyOpened={router.asPath.split('/')[2] === c.name.toLowerCase()} links={c.subjects?.map(s => ({ label: s.name, link: `/plans/${c.name.toLowerCase()}/${s.routeName}` }))} key={c.id} />);

	return (
		<Navbar.Section grow className={classes.links} component={ScrollArea}>
			<div className={classes.linksInner}>{links}</div>
		</Navbar.Section>
	);
}

const useStyles = createStyles((theme) => ({
	navbar: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		paddingBottom: 0,
	},

	header: {
		padding: theme.spacing.md,
		paddingTop: 0,
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
			}`,
	},

	links: {
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
	},

	linksInner: {
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
	},

	footer: {
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
		borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
			}`,
	},
}));