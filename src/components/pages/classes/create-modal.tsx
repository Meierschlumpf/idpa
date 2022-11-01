import { Button, Group, Modal, Stack, Tabs, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCircleOff } from "@tabler/icons";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { TablerIconComponent } from "../../tablerIcon";
import { ClassLessonsTab } from "./create-modal/lessons";
import { ClassMainTab } from "./create-modal/main";
import { ClassStudentsTab } from "./create-modal/students";
import { useStudentsStore } from "./create-modal/students/store";

interface ClassCreateModalProps {
	opened: boolean;
	close: () => void;
}

export interface CreateClassFormType {
	name: string;
	icon: string;
	studentIds: string[];
}

export const ClassCreateModal = ({ opened, close }: ClassCreateModalProps) => {
	const form = useForm<CreateClassFormType>();
	const [activeTab, setActiveTab] = useState<string | null>('main');
	const utils = trpc.useContext();
	const { mutateAsync } = trpc.class.create.useMutation();
	const resetStudents = useStudentsStore(x => x.reset)
	const onClose = () => {
		close();
		form.reset();
		resetStudents();
		setActiveTab('main');
	}
	const handleSubmit = ({ name, icon }: CreateClassFormType) => {
		mutateAsync({ name, icon }, {
			onSuccess(value) {
				utils.class.getAll.setData((previous) => [...(previous ?? []), { ...value, studentCount: 0 }]);
				onClose()
			}
		});
	}

	return <Modal size="xl" opened={opened} onClose={onClose} title={<Title order={3}>Klasse hinzufügen</Title>}>
		<Stack align="center">
			{form.values.icon ? <TablerIconComponent size={64} name={form.values.icon} /> : <IconCircleOff size={64} />}
			<Title order={6}>{form.values.name ?? 'Nicht definiert'}</Title>
		</Stack>

		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack pt='lg'>
				<Tabs value={activeTab} onTabChange={setActiveTab}>
					<Tabs.List grow>
						<Tabs.Tab value="main">Allgemein</Tabs.Tab>
						<Tabs.Tab value="students">Mitglieder</Tabs.Tab>
						<Tabs.Tab value="lessons">Lektionen</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="main" pt='sm'>
						<ClassMainTab form={form} />
					</Tabs.Panel>
					<Tabs.Panel value="students" pt='sm'>
						<ClassStudentsTab form={form} />
					</Tabs.Panel>
					<Tabs.Panel value="lessons" pt='sm'>
						<ClassLessonsTab form={form} />
					</Tabs.Panel>
				</Tabs>

				<Group position="right">
					<Button variant="subtle" color="gray" onClick={onClose}>Abbrechen</Button>
					<Button color="teal" type="submit">Speichern</Button>
				</Group>
			</Stack>
		</form>
	</Modal>
}