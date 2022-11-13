import { Aside, Navbar } from "@mantine/core";
import { ReactNode } from "react";

interface BasicAsideProps {
	children: ReactNode;
}

export const BasicAside = ({ children }: BasicAsideProps) => {
	return <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
		{children}
	</Aside>
}