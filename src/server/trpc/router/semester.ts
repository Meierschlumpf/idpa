import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const semesterRouter = router({
	getById: publicProcedure.input(z.object({
		id: z.string()
	})).query(async ({ctx, input}) => {
		return await ctx.prisma.semster.findFirst({
			where: {
				id: input.id
			}
		});
	}),
	getAll: publicProcedure.query(async ({ctx}) => {
		return await ctx.prisma.semster.findMany();
	})
})