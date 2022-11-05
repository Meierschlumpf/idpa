import React from "react";
import { PlanHolidayItem } from "./item/holiday";
import { PlanLessonItem, PlanLessonItemProps } from "./item/lesson";
import { PlanVacationItem } from "./item/vacation";


type LessonType = {
	type: 'lesson';
	props: PlanLessonItemProps;
}

type VacationType = {
	type: 'vacation';
	props: {start: Date, end: Date, name: string}
}

type HolidayType = {
	type: 'holiday';
	props: {date: Date, name: string}
}

type PlanItemProps = LessonType|VacationType|HolidayType;

export const PlanItem = ({type, props}: PlanItemProps) => {
	const Component = components[type];
	
	return <Component {...props} />
}

const components: {[key in PlanItemProps['type'] ]: React.ElementType} = {
	'lesson': PlanLessonItem,
	'holiday': PlanHolidayItem,
	'vacation': PlanVacationItem,
}

export type PlanItemMapperProps = PlanItemProps & {
	sortBy: Date;
}