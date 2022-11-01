import { ActionIcon, Group, Stack, Table, Text, Tooltip } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash, IconX } from "@tabler/icons";

export const LessonsTable = () => {
	return <Table verticalSpacing="sm">
		<thead>
			<tr>
				<th>Fach</th>
				<th>Zeiten</th>
				<th>{/* actions */}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td style={{ verticalAlign: 'top' }}>Deutsch</td>
				<td>
					<Stack spacing="xs">
						<Group>
							<Text>15:00 - 15:45</Text>

							<Group spacing={0}>
								<Tooltip label="Zeit bearbeiten">
									<ActionIcon>
										<IconPencil size={16} stroke={1.5} />
									</ActionIcon>
								</Tooltip>
								<Tooltip label="Zeit entfernen">
									<ActionIcon>
										<IconX size={16} stroke={1.5} color="red" />
									</ActionIcon>
								</Tooltip>
							</Group>
						</Group>
						<Group>
							<Text>15:45 - 16:30</Text>

							<Group spacing={0}>
								<Tooltip label="Zeit bearbeiten">
									<ActionIcon>
										<IconPencil size={16} stroke={1.5} />
									</ActionIcon>
								</Tooltip>
								<Tooltip label="Zeit entfernen">
									<ActionIcon>
										<IconX size={16} stroke={1.5} color="red" />
									</ActionIcon>
								</Tooltip>
							</Group>
						</Group>
					</Stack>
				</td>
				<td style={{ verticalAlign: 'top' }}>
					<Group spacing={0} position="right">
						<Tooltip label="Zeit hinzufügen">
							<ActionIcon>
								<IconPlus size={16} stroke={1.5} />
							</ActionIcon>
						</Tooltip>
						<Tooltip label="Lektion entfernen">
							<ActionIcon>
								<IconTrash size={16} stroke={1.5} color="red" />
							</ActionIcon>
						</Tooltip>
					</Group>
				</td>
			</tr>
		</tbody>
	</Table>
}