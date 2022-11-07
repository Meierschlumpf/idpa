import { Text, useMantineTheme } from '@mantine/core';
import { RefObject } from 'react';
import { getNextDate } from '../../../helpers/time/next-date';

interface PlanLessonItemNextText {
	visible?: boolean;
	targetRef?: RefObject<HTMLDivElement>;
	date: Date;
}

export const PlanLessonItemNextText = ({ visible, targetRef, date }: PlanLessonItemNextText) => {
	const { colors } = useMantineTheme();

	if (!visible) return null;

	return (
		<Text
			style={{
				position: 'absolute',
				top: -24,
				left: 0,
				color: colors.blue[5],
			}}
			ref={targetRef}
		>
			{getNextDate(date)}
		</Text>
	);
};
