import { Center, Loader } from '@mantine/core';

export const LoadOverlay = ({ visible }: { visible: boolean }) =>
	visible ? (
		<Center>
			<Loader />
		</Center>
	) : null;
