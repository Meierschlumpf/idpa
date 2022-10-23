import { Badge, Tabs } from "@mantine/core"
import { ReactNode } from "react";

interface TableTabProps {
	value: string;
	children: ReactNode;
	showBadge?: boolean;
	count?: number;
}

export const TableTab = ({ value, children, showBadge = true, count }: TableTabProps) => {
	return <Tabs.Tab
		value={value}
		sx={{
			'&[data-active]': {
				borderColor: '#ddd'
			},
			'&[data-active]:hover': {
				borderColor: '#ddd'
			}
		}}
		px="xl"
		rightSection={showBadge && <Badge
			p={0}
			size="xs"
			sx={{ 'minWidth': 16 }}
			color="gray"
			variant='filled'
		>{count}</Badge>}
	>{children}</Tabs.Tab>
}