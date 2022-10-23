import { Group, Table, ThemeIcon } from "@mantine/core";
import { TablerIconComponent } from "../../../tablerIcon";
import { ActiveClassActions } from "./actions/active";
import { ArchivedClassActions } from "./actions/archived";
import { ClassTableType } from "./type";

interface ClassesTableProps {
	items: ClassTableType[] | undefined
}

export const ClassesTable = ({ items }: ClassesTableProps) => {

	if (!items) return <div></div>

	return <Table verticalSpacing='sm'>
		<thead>
			<tr>
				<th>Icon</th>
				<th>Name</th>
				<th>
					Anzahl Mitglider
				</th>
				<th>{/* actions */}</th>
			</tr>
		</thead>
		<tbody>
			{items?.map((classItem) => (
				<tr key={classItem.id}>
					<td>
						<ThemeIcon size={34} variant='default' radius='md'>
							<TablerIconComponent name={classItem.icon} />
						</ThemeIcon>
					</td>
					<td>{classItem.name}</td>
					<td>
						<Group
							style={{ width: 110 }}
							position='right'
						>
							{classItem.studentCount.toString()}
						</Group>
					</td>
					<td>
						<Group spacing={0} position='right'>
							{classItem.isArchived ? <ArchivedClassActions classItem={classItem} /> : <ActiveClassActions classItem={classItem} />}
						</Group>
					</td>
				</tr>
			))}
		</tbody>
	</Table>
}