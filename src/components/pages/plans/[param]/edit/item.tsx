import React from 'react';
import { PlanVacationItem } from '../../../../plan/item/vacation';
import { PlanEditLessonItem, PlanEditLessonItemProps } from './lesson';

type LessonType = {
	type: 'lesson';
	props: PlanEditLessonItemProps;
};

type VacationType = {
	type: 'vacation';
	props: { start: Date; end: Date; name: string };
};

type PlanEditItemProps = LessonType | VacationType;

export const PlanEditItem = ({ type, props }: PlanEditItemProps) => {
	const Component = components[type];

	return <Component {...props} />;
};

const components: { [key in PlanEditItemProps['type']]: React.ElementType } = {
	lesson: PlanEditLessonItem,
	vacation: PlanVacationItem,
};

export type PlanEditItemMapperProps = PlanEditItemProps & {
	sortBy: Date;
};
