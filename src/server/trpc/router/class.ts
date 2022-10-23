import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const classRouter = router({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const classes = await ctx.prisma.class.findMany({
			include: {
				students: {
					select: {
						_count: true,
					},
				},
			},
		});

		return classes.map((c) => ({
			id: c.id,
			name: c.name,
			icon: c.icon,
			studentCount: c.students.length,
			isArchived: c.isArchived,
		}));
	}),
	get: protectedProcedure
		.input(
			z.object({
				classId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			return ctx.prisma.class.findFirst({
				where: {
					id: input.classId,
				},
			});
		}),
	create: protectedProcedure
		.input(
			z.object({
				name: z
					.string()
					.trim()
					.regex(/^[A-z0-9._-]+$/)
					.min(2)
					.max(10),
				icon: z.string().trim().min(2).max(50),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.class.create({
				data: {
					...input,
				},
			});
		}),
	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z
					.string()
					.trim()
					.regex(/^[A-z0-9._-]+$/)
					.min(2)
					.max(10),
				icon: z.string().trim().min(2).max(50),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.class.update({
				data: {
					name: input.name,
					icon: input.icon,
				},
				where: {
					id: input.id,
				},
			});
		}),
	archive: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.class.update({
				data: {
					isArchived: true,
				},
				where: {
					id: input.id,
				},
			});
		}),
	unarchive: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.class.update({
				data: {
					isArchived: false,
				},
				where: {
					id: input.id,
				},
			});
		}),
	remove: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.class.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
