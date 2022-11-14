import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const taskRouter = router({
  getByPlanItemId: publicProcedure
    .input(
      z.object({
        planItemId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.task.findMany({
        where: {
          planItemId: input.planItemId,
        },
        include: {
          materials: true,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        planItemId: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        materials: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.create({
        data: {
          planItemId: input.planItemId,
          title: input.title,
          description: input.description,
          materials: {
            connect: input.materials.map((id) => ({ id })),
          },
        },
      });
    }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        materials: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input.materials.map((id) => ({ id })));
      await await ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          title: input.title,
          description: input.description,
          materials: {
            set: input.materials.map((id) => ({ id })),
          },
        },
      });
    }),
});
