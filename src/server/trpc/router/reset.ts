import { z } from 'zod';
import {
  addDefaultValues,
  generateLastSemesterEntries as generateLastSemesterEntries1,
  generateLastSemesterEntries2,
  generateNextSemesterEntries,
  removeEverything,
} from '../../../pages/api/reset/_helper';
import { publicProcedure, router } from '../trpc';

export const resetRouter = router({
  student: publicProcedure.mutation(async ({ ctx }) => {
    await removeEverything(ctx.prisma);

    await addDefaultValues(ctx.prisma, 'student');
    await generateLastSemesterEntries1(ctx.prisma);
    await generateNextSemesterEntries(ctx.prisma);
  }),
  teacher: publicProcedure.mutation(async ({ ctx }) => {
    await removeEverything(ctx.prisma);
    await addDefaultValues(ctx.prisma, 'teacher');
    await generateLastSemesterEntries1(ctx.prisma);
  }),

  removeEverything: publicProcedure.mutation(async ({ ctx }) => {
    await removeEverything(ctx.prisma);
  }),

  addDefaultValues: publicProcedure
    .input(
      z.object({
        role: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await addDefaultValues(ctx.prisma, input.role as 'student' | 'teacher');
    }),

  generateLastSemesterEntries1: publicProcedure.mutation(async ({ ctx }) => {
    await generateLastSemesterEntries1(ctx.prisma);
  }),
  generateLastSemesterEntries2: publicProcedure.mutation(async ({ ctx }) => {
    await generateLastSemesterEntries2(ctx.prisma);
  }),
});
