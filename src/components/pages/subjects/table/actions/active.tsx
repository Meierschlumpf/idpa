import { ActionIcon, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconArchive } from "@tabler/icons"
import { trpc } from "../../../../../utils/trpc";
import { SubjectEditModal } from "../../edit-modal";
import { SubjectTableType } from "../type";

interface ActiveSubjectActionsProps {
	subject: SubjectTableType;
}

export const ActiveSubjectActions = ({ subject }: ActiveSubjectActionsProps) => {
	const [editModalOpened, editModal] = useDisclosure(false)
	const utils = trpc.useContext();
	const { mutateAsync: archiveAsync } = trpc.subject.archive.useMutation();

	const openEditModal = () => {
		editModal.open();
	}
	const handleArchive = () => {
		archiveAsync({
			id: subject.id
		}, {
			onSuccess() {
				utils.subject.getAll.setData((previous) => {
					return [...(previous ?? []).filter(s => s.id !== subject.id), {
						...subject,
						isArchived: true
					}]
				});
			}
		})
	}

	return <>
		<Tooltip label='Fach bearbeiten'>
			<ActionIcon onClick={openEditModal}>
				<IconPencil size={16} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
		<Tooltip label='Fach archivieren'>
			<ActionIcon onClick={handleArchive}>
				<IconArchive color='red' size={16} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
		<SubjectEditModal opened={editModalOpened} close={editModal.close} subject={subject} />
	</>

}