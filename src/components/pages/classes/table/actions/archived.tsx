import { ActionIcon, Tooltip } from "@mantine/core";
import { IconArchiveOff, IconTrash } from "@tabler/icons";
import { trpc } from "../../../../../utils/trpc";
import { ClassTableType } from "../type";

interface ArchivedClassActionsProps {
	classItem: ClassTableType;
}

export const ArchivedClassActions = ({ classItem }: ArchivedClassActionsProps) => {
	const utils = trpc.useContext();
	const { mutateAsync: unarchiveAsync } = trpc.class.unarchive.useMutation();
	const { mutateAsync: removeAsync } = trpc.class.remove.useMutation();

	const handleUnarchive = () => {
		unarchiveAsync({
			id: classItem.id
		}, {
			onSuccess() {
				utils.class.getAll.setData((previous) => {
					return [...(previous ?? []).filter(s => s.id !== classItem.id), {
						...classItem,
						isArchived: false
					}]
				});
			}
		})
	}

	const handleRemove = () => {
		removeAsync({
			id: classItem.id
		}, {
			onSuccess() {
				utils.class.getAll.setData((previous) => {
					return previous?.filter(s => s.id !== classItem.id);
				});
			}
		})
	}

	return <>
		<Tooltip label='Klasse aktivieren'>
			<ActionIcon onClick={handleUnarchive}>
				<IconArchiveOff size={16} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
		<Tooltip label='Klasse permanent entfernen'>
			<ActionIcon onClick={handleRemove}>
				<IconTrash color='red' size={16} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
	</>

}