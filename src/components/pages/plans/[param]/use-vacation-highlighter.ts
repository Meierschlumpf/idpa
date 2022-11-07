import { vacationDefinitions } from "../../../../constants/vacations";

export const useVacationHighliters = (vacations: typeof vacationDefinitions) => {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const nextStart = vacations
		.filter(
			(x) => x.start.getTime() >= today.getTime() + 1000 * 60 * 60 * 24 * 3,
		)
		.sort((a, b) => a.start.getTime() - b.start.getTime())[0]
		?.start.getTime();
	const current = vacations.some(
		(v) =>
			v.start.getTime() <= today.getTime() + 1000 * 60 * 60 * 24 * 3 &&
			v.end.getTime() >= today.getTime() - 1000 * 60 * 60 * 24,
	);
	const nextEnd = vacations
		.filter((x) => x.end.getTime() >= today.getTime() - 1000 * 60 * 60 * 24)
		.sort((a, b) => a.end.getTime() - b.end.getTime())[0]
		?.end.getTime();
	return { nextStart, nextEnd, current };
};