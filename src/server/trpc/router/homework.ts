import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const homeworkRouter = router({
  getByPlanItemId: publicProcedure
    .input(
      z.object({
        planItemId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.homework.findMany({
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
      await ctx.prisma.homework.create({
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
      await ctx.prisma.homework.delete({
        where: {
          id: input.id,
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        homeworkId: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        materials: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await await ctx.prisma.homework.update({
        where: {
          id: input.homeworkId,
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
  done: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.homework.update({
        where: {
          id: input.id,
        },
        data: {
          isDone: true,
        },
      });
    }),
  todo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.homework.update({
        where: {
          id: input.id,
        },
        data: {
          isDone: false,
        },
      });
    }),
});
