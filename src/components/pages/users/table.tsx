import { Avatar, Group, Table, Text } from "@mantine/core";
import { User } from "@prisma/client";

interface Props {
	users: (User & { role: string })[];
	action: (user: User, index: number) => JSX.Element;
}

export const UserTable = ({ users, action }: Props) => {
	return <Table verticalSpacing="sm">

		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>{/* actions */}</th>
			</tr>
		</thead>
		<tbody>
			{users.map((user, i) => <tr key={i}>
				<td>
					<Group spacing="sm">
						<Avatar size={40} src={user.image} radius={40} />
						<div>
							<Text size="sm" weight={500}>
								{user.name}
							</Text>
							<Text color="dimmed" size="xs">
								{user.role}
							</Text>
						</div>
					</Group>
				</td>
				<td>{user.email}</td>
				<td>
					<Group spacing={0} position="right">
						{action(user, i)}
					</Group>
				</td>
			</tr>)}
		</tbody>
	</Table>
}