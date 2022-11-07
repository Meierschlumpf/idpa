import { AppRouterTypes } from "../../../../utils/trpc";

export const useNextLessonId = (
	lessons: AppRouterTypes['planItem']['getBySemesterId']['output'],
) => {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	return lessons
		?.filter((x) => x.date.getTime() >= today.getTime())
		.sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.id;
};