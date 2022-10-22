import { ActionIcon, Avatar, Container, Group, Menu, Table, Text, Title } from "@mantine/core";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons";
import { NextPage } from "next";
import { BasicLayout } from "../../layout/basic";
import { trpc } from "../../utils/trpc";

const UsersPage: NextPage = () => {
	const { data } = trpc.auth.getSession.useQuery();

	return <BasicLayout>
		<Container>
			<Title>Benutzer</Title>

			<Table verticalSpacing="sm">

				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>{/* actions */}</th>
					</tr>
				</thead>
				<tbody>
					{new Array(99).fill(0).map((v, i) => <tr key={i}>
						<td>
							<Group spacing="sm">
								<Avatar size={40} src={data?.user?.image} radius={40} />
								<div>
									<Text size="sm" weight={500}>
										{data?.user?.name}
									</Text>
									<Text color="dimmed" size="xs">
										{data?.user?.role}
									</Text>
								</div>
							</Group>
						</td>
						<td>{data?.user?.email}</td>
						<td>
							<Group spacing={0} position="right">
								<ActionIcon>
									<IconPencil size={16} stroke={1.5} />
								</ActionIcon>
								<Menu transition="pop" withArrow position="bottom-end">
									<Menu.Target>
										<ActionIcon>
											<IconDots size={16} stroke={1.5} />
										</ActionIcon>
									</Menu.Target>
									<Menu.Dropdown>
										<Menu.Item icon={<IconTrash size={16} stroke={1.5} />} color="red">Delete permenantly</Menu.Item>
									</Menu.Dropdown>
								</Menu>
							</Group>
						</td>
					</tr>)}
				</tbody>
			</Table>
		</Container>
	</BasicLayout>
}

export default UsersPage;