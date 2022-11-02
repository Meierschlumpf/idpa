import { ActionIcon, Tooltip } from '@mantine/core';
import { IconRotate } from '@tabler/icons';

interface Props {
	onClick: () => Promise<void>;
	evaluated: boolean;
}

export const BadgeChangeButton = ({ onClick, evaluated }: Props) => {
	return (
		<Tooltip
			withinPortal
			label={evaluated ? 'Bewertung entfernen' : 'Als bewertet markieren'}
		>
			<ActionIcon onClick={onClick}>
				<IconRotate size={16} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
	);
};
