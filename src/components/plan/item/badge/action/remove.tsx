import { ActionIcon, Tooltip } from '@mantine/core';
import { IconX } from '@tabler/icons';

interface Props {
	onClick: () => Promise<void>;
}

export const BadgeRemoveButton = ({ onClick }: Props) => {
	return (
		<Tooltip withinPortal label='Badge entfernen'>
			<ActionIcon onClick={onClick}>
				<IconX size={16} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
	);
};
