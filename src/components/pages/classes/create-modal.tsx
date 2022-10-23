import { ActionIcon, Button, Group, Modal, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleOff, IconListSearch } from "@tabler/icons";
import { trpc } from "../../../utils/trpc";
import { IconSelectModal, IconType } from "../../icon-select-modal";
import { TablerIconComponent } from "../../tablerIcon";

interface ClassCreateModal {
	opened: boolean;
	close: () => void;
}

interface FormType {
	name: string;
	icon: string;
}

export const ClassCreateModal = ({ opened, close }: ClassCreateModal) => {
	const form = useForm<FormType>();
	const utils = trpc.useContext();
	const { mutateAsync } = trpc.class.create.useMutation();
	const onClose = () => {
		close();
		form.reset();
	}
	const handleSubmit = ({ name, icon }: FormType) => {
		mutateAsync({ name, icon }, {
			onSuccess(value) {
				utils.class.getAll.setData((previous) => [...(previous ?? []), { ...value, studentCount: 0 }]);
				onClose()
			}
		});
	}
	const handleIconSelect = (icon: IconType) => {
		form.setFieldValue('icon', icon.react.replace('Icon', ''));
	}
	const [iconModalOpened, iconModal] = useDisclosure(false);

	return <Modal opened={opened} onClose={onClose} title={<Title order={3}>Fach hinzufügen</Title>}>
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack>
				<TextInput
					data-autofocus
					label="Name"
					placeholder="Bsp. Inf2022a"
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