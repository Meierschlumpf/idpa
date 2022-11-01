import { ActionIcon, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleOff, IconListSearch } from "@tabler/icons";
import { IconSelectModal, IconType } from "../../../icon-select-modal";
import { TablerIconComponent } from "../../../tablerIcon";
import { CreateClassFormType } from "../create-modal";

interface ClassMainTab {
	form: UseFormReturnType<CreateClassFormType, (values: CreateClassFormType) => CreateClassFormType>
}

export const ClassMainTab = ({ form }: ClassMainTab) => {
	const [iconModalOpened, iconModal] = useDisclosure(false);

	const handleIconSelect = (icon: IconType) => {
		form.setFieldValue('icon', icon.react.replace('Icon', ''));
	}

	return <Stack>
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
		<IconSelectModal opened={iconModalOpened} close={iconModal.close} callback={handleIconSelect} />
	</Stack>
}