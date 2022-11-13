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
      await ctx.prisma.activeRole.update({
        where: {
          name: input.name === 'student' ? 'teacher' : 'student',
        },
        data: {
          name: input.name,
        },
      });
    }),
});
