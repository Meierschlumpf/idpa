import { Group, Table, Text, ThemeIcon } from "@mantine/core";
import { TablerIconComponent } from "../../../tablerIcon";
import { ActiveSubjectActions } from "./actions/active";
import { ArchivedSubjectActions } from "./actions/archived";
import { SubjectTableType } from "./type";

interface SubjectsTableProps {
	items: SubjectTableType[] | undefined
}

export const SubjectsTable = ({ items }: SubjectsTableProps) => {

	if (!items) return <div></div>

	return <Table verticalSpacing='sm'>
		<thead>
			<tr>
				<th>Icon</th>
				<th>Name</th>
				<th>
					<Text span>
						Anzahl Lektionen
					</Text>
				</th>
				<th>{/* actions */}</th>
			</tr>
		</thead>
		<tbody>
			{items?.map((subject) => (
				<tr key={subject.id}>
					<td>
						<ThemeIcon size={34} variant='default' radius='md'>
							<TablerIconComponent name={subject.icon} />
						</ThemeIcon>
					</td>
					<td>{subject.name}</td>
					<td>
						<Group
							style={{ width: 114 }}
							position='right'
						>
							{subject.lessonCount.toString()}
						</Group>
					</td>
					<td>
						<Group spacing={0} position='right'>
							{subject.isArchived ? <ArchivedSubjectActions subject={subject} /> : <ActiveSubjectActions subject={subject} />}
						</Group>
					</td>
				</tr>
			))}
		</tbody>
	</Table>
}