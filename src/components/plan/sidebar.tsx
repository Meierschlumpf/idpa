import { createStyles, Navbar, ScrollArea } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import { LinksGroup } from '../links-group';
import { TablerIconComponent } from '../tablerIcon';


export const PlansSidebar = () => {
	const { classes } = useStyles();
	const { data: subjects } = trpc.subject.getAll.useQuery();

	const links = subjects?.map((s) => <LinksGroup icon={<TablerIconComponent name={s.icon} size={16} />} label={s.name} link={`/${s.routeName}`} key={s.id} />);

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
