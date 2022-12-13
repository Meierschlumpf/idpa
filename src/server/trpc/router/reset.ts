import { z } from 'zod';
import { addDefaultValues, generateLastSemesterEntries, generateNextSemesterEntries, removeEverything } from '../../../pages/api/reset/_helper';
import { publicProcedure, router } from '../trpc';

export const resetRouter = router({
  student: publicProcedure.mutation(async ({ ctx }) => {
    await removeEverything(ctx.prisma);

    await addDefaultValues(ctx.prisma, 'student');
    await generateLastSemesterEntries(ctx.prisma);
    await generateNextSemesterEntries(ctx.prisma);
  }),
  teacher: publicProcedure.mutation(async ({ ctx }) => {
    await removeEverything(ctx.prisma);
    await addDefaultValues(ctx.prisma, 'teacher');
    await generateLastSemesterEntries(ctx.prisma);
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

  generateLastSemesterEntries: publicProcedure.mutation(async ({ ctx }) => {
    await generateLastSemesterEntries(ctx.prisma);
  }),
});
