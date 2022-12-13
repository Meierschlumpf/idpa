import { publicProcedure, router } from '../trpc';

export const assessmentRouter = router({
  getForDashboard: publicProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return await ctx.prisma.planItemBadge.findMany({
      include: {
        item: {
          include: {
            plan: true,
          },
        },
        badge: true,
      },
      where: {
        OR: [
          {
            evaluated: true,
          },
          {
            badge: {
              name: 'exam',
            },
          },
        ],
        item: {
          date: {
            gte: today,
          },
        },
      },
      orderBy: {
        item: {
          date: 'asc',
        },
      },
      take: 5,
    });
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.planItemBadge.findMany({
      include: {
        item: {
          include: {
            plan: true,
          },
        },
        badge: true,
      },
      where: {
        OR: [
          {
            evaluated: true,
          },
          {
            badge: {
              name: 'exam',
            },
          },
        ],
        item: {
          date: {
            gte: new Date(),
          },
        },
      },
      orderBy: {
        item: {
          date: 'asc',
        },
      },
    });
  }),
});
