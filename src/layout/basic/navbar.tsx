import { Navbar, Text } from "@mantine/core"

interface BasicNavbarProps {
	opened: boolean;
}

export const BasicNavbar = ({ opened }: BasicNavbarProps) => {
	return <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
		<Text>Application navbar</Text>
	</Navbar>
}