import { literal, z } from 'zod';
import { removeEverything, generateLastSemesterEntries, generateNextSemesterEntries, addDefaultValues } from '../../../pages/api/reset/_helper';
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
});
