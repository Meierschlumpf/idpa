import { ActionIcon, Button, Group, Modal, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleOff, IconListSearch } from "@tabler/icons";
import { useEffect } from "react";
import { trpc } from "../../../utils/trpc";
import { IconSelectModal, IconType } from "../../icon-select-modal";
import { TablerIconComponent } from "../../tablerIcon";
import { SubjectTableType } from "./table/type";

interface SubjectCreateModal {
	subject: SubjectTableType;
	opened: boolean;
	close: () => void;
}

interface FormType {
	name: string;
	icon: string;
}

export const SubjectEditModal = ({ subject, opened, close }: SubjectCreateModal) => {
	const form = useForm<FormType>({
		initialValues: {
			name: subject?.name,
			icon: subject?.icon
		}
	});
	const utils = trpc.useContext();
	const { mutateAsync } = trpc.subject.update.useMutation();
	const onClose = () => {
		close();
		form.setValues({
			icon: subject.icon,
			name: subject.name
		})
	}
	const handleSubmit = ({ name, icon }: FormType) => {
		mutateAsync({
			id: subject.id,
			name, icon
		}, {
			onSuccess(value) {
				utils.subject.getAll.setData((previous) => {
					if (!previous) return previous;
					const current = previous.find(s => s.id == subject.id);
					if (!current) return previous;
					const copy = { ...current }
					copy.name = value.name;
					copy.icon = value.icon;
					return [...(previous ?? []).filter(s => s.id !== subject.id), copy]
				});

				close()
			}
		});
	}
	const handleIconSelect = (icon: IconType) => {
		form.setFieldValue('icon', icon.react.replace('Icon', ''));
	}
	const [iconModalOpened, iconModal] = useDisclosure(false);

	useEffect(() => {
		form.setValues({
			icon: subject.icon,
			name: subject.name
		})
	}, [subject])

	return <Modal opened={opened} onClose={onClose} title={<Title order={3}>Fach bearbeiten</Title>}>
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack>
				<TextInput
					data-autofocus
					label="Name"
					placeholder="Bsp. Deutsch"
					{...form.getInputProps('name')}
					required
				/>

				<TextInput
					label="Icon auswählen"
					placeholder="Bsp. Book"
					icon={form.values.icon ? <TablerIconComponent name={form.values.icon} /> : <IconCircleOff />}
					rightSection={<ActionIcon variant="light" onClick={iconModal.open}>
						<IconListSearch />
					</ActionIcon>}
					{...form.getInputProps('icon')}
					required
					disabled
				/>

				<Group position="right">
					<Button variant="subtle" color="gray" onClick={onClose}>Abbrechen</Button>
					<Button color="teal" type="submit">Speichern</Button>
				</Group>
			</Stack>
			<IconSelectModal opened={iconModalOpened} close={iconModal.close} callback={handleIconSelect} />
		</form>
	</Modal>
}