import { Center, Text } from '@mantine/core';

export const ErrorOverlay = ({ visible }: { visible: boolean }) =>
	visible ? (
		<Center>
			<Text weight={500}>
				Es ist ein Fehler aufgetreten, bitte versuche es später nochmal.
			</Text>
		</Center>
	) : null;
