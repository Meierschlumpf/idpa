import {
	ActionIcon,
	Button,
	Container,
	Group,
	Table,
	Text,
	ThemeIcon,
	Title,
	Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArchive, IconPencil, IconPlus } from '@tabler/icons';
import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { SubjectCreateModal } from '../../components/pages/subjects/create-modal';
import { SubjectEditModal } from '../../components/pages/subjects/edit-modal';
import { TablerIconComponent } from '../../components/tablerIcon';
import { BasicLayout } from '../../layout/basic';
import { trpc } from '../../utils/trpc';

const SubjectsPage: NextPage = () => {
	const { data } = trpc.subject.getAll.useQuery();
	const [createModalOpened, createModal] = useDisclosure(false);
	const [editSubject, setEditSubject] = useState<{ id: string, name: string, icon: string }>();
	const [editModalOpened, editModal] = useDisclosure(false, {
		onClose() {
			setEditSubject(undefined);
		}
	});
	const ref = useRef<HTMLDivElement | null>(null);
	const openEditModal = (subject: { id: string, name: string, icon: string }) => {
		setEditSubject(subject);
		editModal.open();
	}

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

				<Table verticalSpacing='sm'>
					<thead>
						<tr>
							<th>Icon</th>
							<th>Name</th>
							<th>
								<Text span ref={ref}>
									Anzahl Lektionen
								</Text>
							</th>
							<th>{/* actions */}</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((subject) => (
							<tr key={subject.id}>
								<td>
									<ThemeIcon size={34} variant='default' radius='md'>
										<TablerIconComponent name={subject.icon} />
									</ThemeIcon>
								</td>
								<td>{subject.name}</td>
								<td>
									<Group
										style={{ width: ref.current?.offsetWidth }}
										position='right'
									>
										{subject.lessonCount.toString()} x
									</Group>
								</td>
								<td>
									<Group spacing={0} position='right'>
										<Tooltip label='Fach bearbeiten'>
											<ActionIcon onClick={() => openEditModal(subject)}>
												<IconPencil size={16} stroke={1.5} />
											</ActionIcon>
										</Tooltip>
										<Tooltip label='Fach archivieren'>
											<ActionIcon>
												<IconArchive color='red' size={16} stroke={1.5} />
											</ActionIcon>
										</Tooltip>
									</Group>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>
			<SubjectEditModal opened={editModalOpened} close={editModal.close} subject={editSubject} />
		</BasicLayout>
	);
};

export default SubjectsPage;
