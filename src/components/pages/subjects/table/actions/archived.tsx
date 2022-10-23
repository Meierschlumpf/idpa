import { ActionIcon, Tooltip } from "@mantine/core";
import { IconArchiveOff, IconTrash } from "@tabler/icons";
import { trpc } from "../../../../../utils/trpc";
import { SubjectTableType } from "../type";

interface ArchivedSubjectActionsProps {
	subject: SubjectTableType;
}

export const ArchivedSubjectActions = ({ subject }: ArchivedSubjectActionsProps) => {
	const utils = trpc.useContext();
	const { mutateAsync: unarchiveAsync } = trpc.subject.unarchive.useMutation();
	const { mutateAsync: removeAsync } = trpc.subject.remove.useMutation();

	const handleUnarchive = () => {
		unarchiveAsync({
			id: subject.id
		}, {
			onSuccess() {
				utils.subject.getAll.setData((previous) => {
					return [...(previous ?? []).filter(s => s.id !== subject.id), {
						...subject,
						isArchived: false
					}]
				});
			}
		})
	}

	const handleRemove = () => {
		removeAsync({
			id: subject.id
		}, {
			onSuccess() {
				utils.subject.getAll.setData((previous) => {
					return previous?.filter(s => s.id !== subject.id);
				});
			}
		})
	}

	return <>
		<Tooltip label='Fach aktivieren'>
			<ActionIcon onClick={handleUnarchive}>
				<IconArchiveOff size={16} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
		<Tooltip label='Fach permanent entfernen'>
			<ActionIcon onClick={handleRemove}>
				<IconTrash color='red' size={16} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
	</>

}