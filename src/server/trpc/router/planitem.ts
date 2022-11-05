import { PlanBadge } from '@prisma/client';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const planItemRouter = router({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const badges = await ctx.prisma.planBadge.findMany();
		const badgesMap = badges.reduce((prev, curr) => {
			prev.set(curr.id, curr);
			return prev;
		}, new Map<string, PlanBadge>());
		const items = await ctx.prisma.planItem.findMany({
			include: {
				badges: true,
				plan: true,
			},
			orderBy: {
				date: 'asc',
			},
		});

		return items.map((item) => ({
			id: item.id,
			title: item.title,
			description: item.description,
			date: item.date,
			badges: item.badges.map((badge) => ({
				id: badge.badgeId,
				name: badgesMap.get(badge.badgeId)?.name ?? 'unknown',
				evaluated: badge.evaluated,
			})),
			subjectId: item.plan.subjectId,
		}));
	}),
	getBySubjectId: publicProcedure
		.input(
			z.object({
				subjectId: z.string().nullable(),
			}),
		)
		.query(async ({ ctx, input }) => {
			if (!input.subjectId) return;
			const badges = await ctx.prisma.planBadge.findMany();
			const badgesMap = badges.reduce((prev, curr) => {
				prev.set(curr.id, curr);
				return prev;
			}, new Map<string, PlanBadge>());
			const items = await ctx.prisma.planItem.findMany({
				include: {
					badges: true,
					plan: true,
				},
				orderBy: {
					date: 'asc',
				},
				where: {
					plan: {
						subjectId: input.subjectId,
					},
				},
			});

			return items.map((item) => ({
				id: item.id,
				title: item.title,
				description: item.description,
				date: item.date,
				badges: item.badges.map((badge) => ({
					id: badge.badgeId,
					name: badgesMap.get(badge.badgeId)?.name ?? 'unknown',
					evaluated: badge.evaluated,
				})),
			}));
		}),

	getByPlanId: publicProcedure
		.input(
			z.object({
				planId: z.string().nullable(),
			}),
		)
		.query(async ({ ctx, input }) => {
			if (!input.planId) return;
			const badges = await ctx.prisma.planBadge.findMany();
			const badgesMap = badges.reduce((prev, curr) => {
				prev.set(curr.id, curr);
				return prev;
			}, new Map<string, PlanBadge>());
			const items = await ctx.prisma.planItem.findMany({
				include: {
					badges: true,
				},
				orderBy: {
					date: 'asc',
				},
				where: {
					planId: input.planId,
				},
			});

			return items.map((item) => ({
				id: item.id,
				title: item.title,
				description: item.description,
				date: item.date,
				badges: item.badges.map((badge) => ({
					id: badge.badgeId,
					name: badgesMap.get(badge.badgeId)?.name ?? 'unknown',
					evaluated: badge.evaluated,
				})),
			}));
		}),

	addBadge: publicProcedure
		.input(
			z.object({
				itemId: z.string(),
				badgeId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.planItemBadge.create({
				data: {
					itemId: input.itemId,
					badgeId: input.badgeId,
					evaluated: false,
				},
			});
		}),

	removeBadge: publicProcedure
		.input(
			z.object({
				itemId: z.string(),
				badgeId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.planItemBadge.delete({
				where: {
					itemId_badgeId: {
						itemId: input.itemId,
						badgeId: input.badgeId,
					},
				},
			});
		}),

	changeBadgeEvaluation: publicProcedure
		.input(
			z.object({
				itemId: z.string(),
				badgeId: z.string(),
				evaluated: z.boolean(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.planItemBadge.update({
				where: {
					itemId_badgeId: {
						itemId: input.itemId,
						badgeId: input.badgeId,
					},
				},
				data: {
					evaluated: input.evaluated,
				},
			});
		}),
	getBadges: publicProcedure.query(async ({ ctx }) => {
		return ctx.prisma.planBadge.findMany();
	}),
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string(),
				description: z.string().nullable(),
				badges: z.array(
					z.object({
						id: z.string(),
						evaluated: z.boolean(),
					}),
				),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.planItem.update({
				where: {
					id: input.id,
				},
				data: {
					title: input.title,
					description:
						input.description?.trim().length === 0 ? null : input.description,
					badges: {
						deleteMany: {},
						create: input.badges.map((badge) => ({
							badge: { connect: { id: badge.id } },
							evaluated: badge.evaluated,
						})),
					},
				},
			});
		}),
});
