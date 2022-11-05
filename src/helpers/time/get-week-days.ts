import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

/**
 * Get names of week days
 * @param start first weekday included (starting at monday)
 * @param end last weekday included
 * @returns list of weekdays
 */
export const generateSelectDataWeekDays = (days: number[]) => {
	return days.map((id) => {
		return {
			value: id,
			label: dayjs().weekday(id).locale('de-ch').format('dddd'),
		};
	});
};
