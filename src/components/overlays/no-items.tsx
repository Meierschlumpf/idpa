import { Center, Text } from '@mantine/core';

export const NoItemsOverlay = ({ visible }: { visible: boolean }) =>
	visible ? (
		<Center>
			<Text weight={500}>Es wurden keine Elemente gefunden</Text>
		</Center>
	) : null;
