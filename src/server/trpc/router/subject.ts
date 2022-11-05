import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const subjectRouter = router({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const subjects = await ctx.prisma.subject.findMany();

		return subjects.map((s) => ({
			id: s.id,
			name: s.name,
			icon: s.icon,
			routeName: s.routeName,
		}));
	}),
	getByRouteName: publicProcedure
		.input(
			z.object({
				routeName: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const subject = await ctx.prisma.subject.findFirst({
				where: {
					routeName: input.routeName.toLowerCase(),
				},
			});
			return subject
				? {
						id: subject.id,
						name: subject.name,
						icon: subject.icon,
				  }
				: null;
		}),
});
