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
});
