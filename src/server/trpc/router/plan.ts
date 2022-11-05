import { z } from 'zod';
import { vacations } from '../../../constants/vacations';
import { publicProcedure, router } from '../trpc';

export const planRouter = router({
	create: publicProcedure
		.input(
			z.object({
				subjectId: z.string(),
				name: z.string(),
				start: z.date(),
				end: z.date(),
				day: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const planCount = await ctx.prisma.plan.count({
				where: {
					OR: [
						{
							subjectId: input.subjectId,
							start: {
								gt: input.start,
								lt: input.end,
							},
						},
						{
							subjectId: input.subjectId,
							end: {
								gt: input.start,
								lt: input.end,
							},
						},
					],
				},
			});
			if (planCount >= 1) throw new Error('Plan already exists!');

			const plan = await ctx.prisma.plan.create({
				data: {
					start: input.start,
					end: input.end,
					day: input.day,
					subjectId: input.subjectId,
					name: input.name,
				},
			});

			const dayOfStart = input.start.getDay();
			const difference = (input.day + 7 - dayOfStart) % 7;
			let nextDay = new Date(
				input.start.getFullYear(),
				input.start.getMonth(),
				input.start.getDate() + difference,
				12,
				0,
				0,
			);

			while (nextDay.getTime() <= input.end.getTime()) {
				if (
					!vacations.some(
						(v) =>
							v.start.getTime() <= nextDay.getTime() &&
							v.end.getTime() >= nextDay.getTime(),
					)
				) {
					await ctx.prisma.planItem.create({
						data: {
							date: nextDay,
							planId: plan.id,
						},
					});
				}
				nextDay = getNextDate(nextDay);
			}
		}),
	getByNameAndSubjectId: publicProcedure
		.input(
			z.object({
				name: z.string(),
				subjectId: z.string(),
			}),
		)
		.query(({ ctx, input }) => {
			return ctx.prisma.plan.findFirst({
				where: {
					name: input.name,
					subjectId: input.subjectId,
				},
			});
		}),
});

const getNextDate = (lastDate: Date) => {
	return new Date(
		lastDate.getFullYear(),
		lastDate.getMonth(),
		lastDate.getDate() + 7,
		12,
		0,
		0,
	);
};
