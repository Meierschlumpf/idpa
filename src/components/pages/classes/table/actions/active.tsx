import { ActionIcon, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconArchive } from "@tabler/icons"
import { trpc } from "../../../../../utils/trpc";
import { ClassEditModal } from "../../edit-modal";
import { ClassTableType } from "../type";

interface ActiveClassActionsProps {
	classItem: ClassTableType;
}

export const ActiveClassActions = ({ classItem }: ActiveClassActionsProps) => {
	const [editModalOpened, editModal] = useDisclosure(false)
	const utils = trpc.useContext();
	const { mutateAsync: archiveAsync } = trpc.class.archive.useMutation();

	const openEditModal = () => {
		editModal.open();
	}
	const handleArchive = () => {
		archiveAsync({
			id: classItem.id
		}, {
			onSuccess() {
				utils.class.getAll.setData((previous) => {
					return [...(previous ?? []).filter(s => s.id !== classItem.id), {
						...classItem,
						isArchived: true
					}]
				});
			}
		})
	}

	return <>
		<Tooltip label='Klasse bearbeiten'>
			<ActionIcon onClick={openEditModal}>
				<IconPencil size={16} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
		<Tooltip label='Klasse archivieren'>
			<ActionIcon onClick={handleArchive}>
				<IconArchive color='red' size={16} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
		<ClassEditModal opened={editModalOpened} close={editModal.close} classItem={classItem} />
	</>

}