import { Avatar, Button, Center, Checkbox, Group, Modal, ScrollArea, Stack, Table, Text, Title } from "@mantine/core"
import { useListState } from "@mantine/hooks";
import { User } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { trpc } from "../../../../../utils/trpc";
import { useStudentsStore } from "./store";

interface StudentSelectModalProps {
	opened: boolean;
	close: () => void;
}

export const StudentSelectModal = ({ opened, close }: StudentSelectModalProps) => {
	const { data } = trpc.user.getNotInClass.useQuery({ classId: '' });
	const removed = useStudentsStore(x => x.removed);
	const added = useStudentsStore(x => x.added);
	const handleSelection = useStudentsStore(x => x.handleSelection);
	const [selected, { remove, append, setState }] = useListState<string>();
	const [search, setSearch] = useState<string>();

	const users = [...(data ?? []).filter(u => !added.some(a => u.id === a.id)), ...removed];

	const onClose = () => {
		setState([]);
		close();
	}

	const onSubmit = () => {
		console.log(users.filter(x => selected.includes(x.id)));
		handleSelection(users.filter(x => selected.includes(x.id)));
		onClose();
	}

	//const users = useMemo(() => [...(data ? data.filter(x => !addedUserIds.some(y => y.id === x.id)) : []), ...removedUsers], [data, addedUserIds, removedUsers])

	const selectedUsers = useMemo(() => {
		return users?.filter(x => selected.includes(x.id));
	}, [selected, users]);

	const filteredUsers = useMemo(() => {
		return users?.filter(x => !selected.includes(x.id));
	}, [search, users, selected])

	return <Modal opened={opened} onClose={onClose} size="xl" title={<Title order={3}>Mitglieder auswählen</Title>}>
		<Stack>
			<ScrollArea styles={{
				'viewport': {
					maxHeight: 400
				}
			}}>
				<Center>
					<Table verticalSpacing="sm">
						<thead>
							<tr>
								<th></th>
								<th>Name</th>
								<th>Email</th>
								<th>{/* actions */}</th>
							</tr>
						</thead>
						<tbody>
							{selectedUsers?.map((user, index) => <UserTableRow selected={true} key={user.id} user={user} index={index} onSelectChange={() => remove(selected.findIndex(x => x === user.id))} />)}
							{filteredUsers?.map((user, index) => <UserTableRow selected={false} key={user.id} user={user} index={index} onSelectChange={() => append(user.id)} />)}
						</tbody>
					</Table>
				</Center>
			</ScrollArea>

			<Group position="right">
				<Button variant="subtle" color="gray" onClick={onClose}>Abbrechen</Button>
				<Button color="teal" onClick={onSubmit}>Auswahl bestätigen</Button>
			</Group>
		</Stack>
	</Modal>
}

interface UserTableRowProps {
	index: number;
	user: User;
	onSelectChange: () => void;
	selected: boolean;
}

const UserTableRow = ({ index, user, onSelectChange, selected }: UserTableRowProps) => {
	return <tr>
		<td>
			<Checkbox checked={selected} onChange={onSelectChange} />
		</td>
		<td>
			<Group spacing="sm">
				<Avatar size={40} src={user.image} radius={40} />
				<div>
					<Text size="sm" weight={500}>
						{user.name}
					</Text>
				</div>
			</Group>
		</td>
		<td>{user.email}</td>
		<td>
			<Group spacing={0} position="right">

			</Group>
		</td>
	</tr>
}