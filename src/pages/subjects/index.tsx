import {
	Button,
	Container,
	Group, Tabs,
	Text, Title
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import { NextPage } from 'next';
import { useState } from 'react';
import { TableTab } from '../../components/common/tab';
import { SubjectCreateModal } from '../../components/pages/subjects/create-modal';
import { SubjectsTable } from '../../components/pages/subjects/table/base';
import { BasicLayout } from '../../layout/basic';
import { trpc } from '../../utils/trpc';

const SubjectsPage: NextPage = () => {
	const [activeTab, setActiveTab] = useState<string | null>('active');
	const [createModalOpened, createModal] = useDisclosure(false);
	const { data } = trpc.subject.getAll.useQuery();
	const activeItems = data?.filter(s => !s.isArchived);
	const archivedItems = data?.filter(s => s.isArchived);

	return (
		<BasicLayout>
			<Container>
				<Group position='apart' align='center'>
					<Title>Fächer</Title>
					<Button variant='light' color='gray' onClick={createModal.open}>
						<Group align='center' spacing='xs'>
							<IconPlus size={20} />
							<Text style={{ lineHeight: 20 }} span>
								Hinzufügen
							</Text>
						</Group>
					</Button>
					<SubjectCreateModal
						opened={createModalOpened}
						close={createModal.close}
					/>
				</Group>
				<Group>
					<Tabs value={activeTab} onTabChange={setActiveTab} style={{ width: '100%' }}>
						<Tabs.List>
							<TableTab value='active' count={activeItems?.length}>Aktiv</TableTab>
							<TableTab value='archived' count={archivedItems?.length}>Archiviert</TableTab>
							<TableTab value='all' count={data?.length ?? 0}>Alle</TableTab>
						</Tabs.List>

						<Tabs.Panel value='active'>
							<SubjectsTable items={activeItems} />
						</Tabs.Panel>

						<Tabs.Panel value='archived'>
							<SubjectsTable items={archivedItems} />
						</Tabs.Panel>

						<Tabs.Panel value='all'>
							<SubjectsTable items={data} />
						</Tabs.Panel>
					</Tabs>
				</Group>
			</Container>
		</BasicLayout>
	);
};

export default SubjectsPage;
