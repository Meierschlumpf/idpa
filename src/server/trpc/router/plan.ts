import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { vacationDefinitions } from '../../../constants/vacations';
import { publicProcedure, router } from '../trpc';

export const planRouter = router({
  create: publicProcedure
    .input(
      z.object({
        subjectId: z.string(),
        semesterId: z.string(),
        day: z.number(),
        startTime: z.date(),
        endTime: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const planCount = await ctx.prisma.plan.count({
        where: {
          subjectId: input.subjectId,
          semesterId: input.semesterId,
        },
      });
      if (planCount >= 1)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Plan already exists!',
          cause: 'PLAN_ALREADY_EXISTS',
        });

      const startTime = input.startTime.getHours() * 60 + input.startTime.getMinutes();
      const endTime = input.endTime.getHours() * 60 + input.endTime.getMinutes();

      const plan = await ctx.prisma.plan.create({
        data: {
          day: input.day,
          subjectId: input.subjectId,
          semesterId: input.semesterId,
          startTime,
          endTime,
        },
      });

      const semester = await ctx.prisma.semster.findFirst({
        where: {
          id: input.semesterId,
        },
      });

      if (!semester) throw new Error('Semester not found!');

      const dayOfStart = semester.start.getDay();
      const difference = (input.day + 7 - dayOfStart) % 7;
      let nextDay = new Date(semester.start.getFullYear(), semester.start.getMonth(), semester.start.getDate() + difference, input.startTime.getHours(), input.startTime.getMinutes(), 0);

      while (nextDay.getTime() <= semester.end.getTime()) {
        if (!vacationDefinitions.some((v) => v.start.getTime() <= nextDay.getTime() && v.end.getTime() >= nextDay.getTime())) {
          await ctx.prisma.planItem.create({
            data: {
              date: nextDay,
              planId: plan.id,
            },
          });
        }
        nextDay = getNextDate(nextDay);
      }

      return plan;
    }),
  getBySemesterAndSubjectId: publicProcedure
    .input(
      z.object({
        semester: z.string(),
        subjectId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.plan.findFirst({
        where: {
          semesterId: input.semester,
          subjectId: input.subjectId,
        },
      });
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const plan = ctx.prisma.plan.findFirst({
        where: {
          id: input.id,
        },
        include: {
          subject: true,
          semester: true,
        },
      });
      if (plan) return plan;
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Plan with id ${input.id} has not been found`,
      });
    }),
  getForDashboard: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.plan.findMany({
      include: {
        subject: true,
        semester: true,
      },
      where: {
        semester: {
          end: {
            gt: new Date(),
          },
        },
      },
      orderBy: [
        {
          semester: {
            start: 'asc',
          },
        },
        {
          subject: {
            name: 'asc',
          },
        },
      ],

      take: 6,
    });
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.plan.findMany({
      include: {
        subject: true,
        semester: true,
      },
      orderBy: [
        {
          semester: {
            start: 'asc',
          },
        },
        {
          subject: {
            name: 'asc',
          },
        },
      ],
    });
  }),
});

const getNextDate = (lastDate: Date) => {
  return new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + 7, 12, 0, 0);
};
