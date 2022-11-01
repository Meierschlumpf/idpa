import { Button, Group, Stack, Tabs, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import { CreateClassFormType } from "../create-modal";
import { LessonsTable } from "./lessons/table";

interface ClassLessonsTabProps {
	form: UseFormReturnType<CreateClassFormType, (values: CreateClassFormType) => CreateClassFormType>;
}

export const ClassLessonsTab = ({ }: ClassLessonsTabProps) => {
	const semesters = 8;

	return <>
		<Text weight={500}>Bitte Semester auswählen</Text>
		<Tabs>
			<Tabs.List grow>
				{new Array(semesters).fill(0).map((v, i) => <Tabs.Tab key={i + 1} value={(i + 1).toString()}>{i + 1}</Tabs.Tab>)}
			</Tabs.List>

			{new Array(semesters).fill(0).map((v, i) => <Tabs.Panel key={i + 1} value={(i + 1).toString()}>
				<Stack spacing="xs" mt="md">
					<Group position="right">
						<Button variant='light' color='gray' >
							<Group align='center' spacing='xs'>
								<IconPlus size={20} />
								<Text style={{ lineHeight: 20 }} span>
									Neues Fach
								</Text>
							</Group>
						</Button>
					</Group>
					<LessonsTable />
				</Stack>
			</Tabs.Panel>)}

		</Tabs>
	</>
}