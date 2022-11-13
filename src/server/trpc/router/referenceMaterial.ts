import { ReferenceMaterial } from '@prisma/client';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const referenceMaterialRouter = router({
  getBySemesterAndSubjectId: publicProcedure.input(z.object({
    semester: z.string(),
    subjectId: z.string(),
  })).query(async ({ctx, input}) => {
    return await ctx.prisma.referenceMaterial.findMany({
      where: {
        plan: {
          semesterId: input.semester,
          subjectId: input.subjectId
        },
      },
      include: {
        plan: true
      },
    });
  }),
  getBySemester: publicProcedure.input(z.object({
    semester: z.string()
  }))
  .query(async ({ctx, input}) => {
    const items = await ctx.prisma.referenceMaterial.findMany({
      where: {
        plan: {
          semesterId: input.semester
        },
      },
      include: {
        plan: {
          include: {
            subject: true
          }
        }
      },
    });

    const subjects = items.reduce((previous: ReferenceMaterialSubjectType[], {plan, ...material}) => {
      const index = previous.findIndex(x => x.id === plan.subjectId)
      if (index !== -1) {
        previous[index]!.materials.push(material);
        return previous;
      }
      previous.push({
        id: plan.subjectId,
        name: plan.subject.name,
        materials: [material],
      });
      return previous;
    }, []);

    return subjects;
  })
})

type ReferenceMaterialSubjectType = {
  id: string;
  name: string;
  materials: Omit<ReferenceMaterial, 'plan'>[];
}