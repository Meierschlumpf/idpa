import { literal, z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const activeRoleRouter = router({
  current: publicProcedure.query(async ({ ctx }) => await ctx.prisma.activeRole.findFirst()),
  update: publicProcedure
    .input(
      z.object({
        name: z.union([literal('teacher'), literal('student')]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.activeRole.updateMany({
        data: {
          name: input.name,
        },
      });
    }),
});
