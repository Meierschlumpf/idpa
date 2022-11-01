import { ActionIcon, Button, Center, Group, ScrollArea, Stack, Text, TextInput, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure, useListState } from "@mantine/hooks";
import { User } from "@prisma/client";
import { IconPlus, IconTrash } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserTable } from "../../users/table";
import { CreateClassFormType } from "../create-modal";
import { RemoveStudentConfirmModal } from "./students/remove-confirm-modal";
import { StudentSelectModal } from "./students/select-modal";
import { useStudentsStore } from "./students/store";

interface ClassStudentsTabProps {
	form: UseFormReturnType<CreateClassFormType, (values: CreateClassFormType) => CreateClassFormType>
}

export const ClassStudentsTab = ({ form }: ClassStudentsTabProps) => {
	// TODO: change to just list of members with add button on the top, where you can open another modal with a list of all students that are not part of the members currently. 
	// And then just use the default loading list and checkboxes. To save which are removed and which added we can just create two lists (See representationsystem of sdb)
	const [selectModalOpened, selectModal] = useDisclosure(false);
	const [search, setSearch] = useState<string>();
	const added = useStudentsStore(x => x.added);

	const studentIds = form.values.studentIds ?? [];


	return <Stack spacing="sm">
		<Group position="right" align="center">

			<Button variant='light' color='gray' onClick={selectModal.open}>
				<Group align='center' spacing='xs'>
					<IconPlus size={20} />
					<Text style={{ lineHeight: 20 }} span>
						Neue Mitglieder
					</Text>
				</Group>
			</Button>
			<StudentSelectModal
				opened={selectModalOpened}
				close={selectModal.close}
			/>
		</Group>

		<Group position="apart" align="center">
			<Group align="center" spacing="xs">
				<Title order={6}>Mitglieder</Title>
				<Text color="dimmed" size="xs">{studentIds.length} Elemente</Text>
			</Group>
			<TextInput style={{ width: "300px" }} value={search} onChange={ev => setSearch(ev.target.value)} placeholder="Nach Namen filtern" />
		</Group>

		<ScrollArea styles={{
			'viewport': {
				maxHeight: 400
			}
		}}>
			<Stack>
				{studentIds.length !== 0 ? <Center>Es wurden keine Mitglieder gefunden</Center> : <>
					<UserTable users={added} action={(user, index) =>
						<TableActions user={user} form={form} index={index} key={user.id} />
					} /></>}
			</Stack>
		</ScrollArea>
	</Stack>
}

interface TableActionProps {
	form: UseFormReturnType<CreateClassFormType, (values: CreateClassFormType) => CreateClassFormType>;
	user: User;
	index: number;
}

const TableActions = ({ form, user, index }: TableActionProps) => {
	const [deleteConfirmModalOpened, deleteConfirmModal] = useDisclosure(false);


	return <>
		<ActionIcon onClick={deleteConfirmModal.open}><IconTrash size={16} stroke={1.5} color="red" /></ActionIcon>
		<RemoveStudentConfirmModal opened={deleteConfirmModalOpened} close={deleteConfirmModal.close} form={form} index={index} user={user} className={form.values.name} />

	</>
}