import {
	Button,
	Container,
	Divider,
	Group, Tabs,
	Text, TextInput, Title
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { TableTab } from '../../components/common/tab';
import { ClassCreateModal } from '../../components/pages/classes/create-modal';
import { ClassesTable } from '../../components/pages/classes/table/base';
import { BasicLayout } from '../../layout/basic';
import { trpc } from '../../utils/trpc';

const ClassesPage: NextPage = () => {
	const [activeTab, setActiveTab] = useState<string | null>('active');
	const [search, setSearch] = useState<string>()
	const [createModalOpened, createModal] = useDisclosure(false);
	const { data } = trpc.class.getAll.useQuery();
	const filtered = useMemo(() => data?.filter(c => (!search || search.length === 0 || c.name.toLowerCase().includes(search.trim().toLowerCase()))), [data, search])
	const activeItems = filtered?.filter(c => !c.isArchived);
	const archivedItems = filtered?.filter(c => c.isArchived);

	return (
		<BasicLayout>
			<Container>
				<Group position='apart' align='center'>
					<Title>Klassen</Title>
					<Button variant='light' color='gray' onClick={createModal.open}>
						<Group align='center' spacing='xs'>
							<IconPlus size={20} />
							<Text style={{ lineHeight: 20 }} span>
								Neue Klasse
							</Text>
						</Group>
					</Button>
					<ClassCreateModal
						opened={createModalOpened}
						close={createModal.close}
					/>
				</Group>
				<Divider my={4} />
				<Group>
					<Tabs value={activeTab} onTabChange={setActiveTab} style={{ width: '100%' }}>
						<Tabs.List>
							<TableTab value='active' count={activeItems?.length}>Aktiv</TableTab>
							<TableTab value='archived' count={archivedItems?.length}>Archiviert</TableTab>
							<TableTab value='all' count={data?.length ?? 0}>Alle</TableTab>
							<TextInput ml="auto" placeholder="Nach Namen filtern" sx={{ width: '300px' }} value={search} onChange={(ev) => setSearch(ev.target.value)} />
						</Tabs.List>

						<Tabs.Panel value='active'>
							<ClassesTable items={activeItems} />
						</Tabs.Panel>

						<Tabs.Panel value='archived'>
							<ClassesTable items={archivedItems} />
						</Tabs.Panel>

						<Tabs.Panel value='all'>
							<ClassesTable items={filtered} />
						</Tabs.Panel>
					</Tabs>
				</Group>
			</Container>
		</BasicLayout >
	);
};

export default ClassesPage;
