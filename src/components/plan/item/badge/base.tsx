import { Badge, MantineColor, ThemeIcon, Tooltip } from '@mantine/core';
import { IconClipboardCheck } from '@tabler/icons';
import { ReactNode } from 'react';

interface PlanItemBadgeBaseProps {
	label: string;
	color: MantineColor;
	evaluated?: boolean;
	rightSection?: ReactNode;
	leftSection?: ReactNode;
}

export const PlanItemBadgeBase = ({
	label,
	color,
	evaluated,
	rightSection,
	leftSection
}: PlanItemBadgeBaseProps) => {
	return <Badge
		pr={rightSection ? 0 : undefined}
		pl={leftSection ? 0 : undefined}
		styles={{
			rightSection: {
				display: 'flex',
				alignItems: 'center',
			},
			inner: {
				display: 'flex',
				alignItems: 'center',
				gap: 4
			}
		}}
		size='lg'
		radius='md'
		color={color}
		rightSection={rightSection}
		leftSection={leftSection}
	>
		{label} {evaluated && <Tooltip withinPortal label="Wird bewertet"><ThemeIcon style={{
			color: 'inherit',
			background: 'transparent'
		}}><IconClipboardCheck size={18} /></ThemeIcon></Tooltip>}
	</Badge>;
};

export type BadgeType =
	| 'exam'
	| 'excursion'
	| 'presentation'
	| 'sol'
	| 'submission';
