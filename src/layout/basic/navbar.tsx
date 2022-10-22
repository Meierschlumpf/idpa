import { Navbar } from "@mantine/core";
import { ReactNode } from "react";

interface BasicNavbarProps {
	opened: boolean;
	children: ReactNode;
}

export const BasicNavbar = ({ opened, children }: BasicNavbarProps) => {
	return <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
		{children}
	</Navbar>
}