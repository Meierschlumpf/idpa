import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { User } from "@prisma/client";
import { CreateClassFormType } from "../../create-modal";
import { useStudentsStore } from "./store";

interface RemoveStudentConfirmModalProps {
	opened: boolean;
	close: () => void;
	index: number;
	user: User;
	className: string;
	form: UseFormReturnType<CreateClassFormType, (values: CreateClassFormType) => CreateClassFormType>
}

export const RemoveStudentConfirmModal = ({ opened, close, index, user, className, form }: RemoveStudentConfirmModalProps) => {

	const remove = useStudentsStore(x => x.remove);

	const onClose = () => {
		close();
	}

	const handleRemove = () => {
		form.removeListItem('studentIds', index);
		remove(user);
		close();
	}

	return <Modal size="sm" centered opened={opened} onClose={onClose} title={<Title order={3}>Mitglied entfernen</Title>}>
		<Stack>
			<Text>Bist du sicher, dass du <Text weight={500} span>{user.name}</Text> von der Klasse {className} entfernen möchtest?</Text>
			<Group position="right">
				<Button variant="subtle" color="gray" onClick={onClose}>Abbrechen</Button>
				<Button color="red" onClick={handleRemove}>Bestätigen</Button>
			</Group>
		</Stack>
	</Modal>
}