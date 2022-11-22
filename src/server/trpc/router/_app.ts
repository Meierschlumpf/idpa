// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { activeRoleRouter } from './activeRole';
import { assessmentRouter } from './assessments';
import { homeworkRouter } from './homework';
import { planRouter } from './plan';
import { planItemRouter } from './planitem';
import { referenceMaterialRouter } from './referenceMaterial';
import { semesterRouter } from './semester';
import { subjectRouter } from './subject';
import { taskRouter } from './task';

export const appRouter = router({
  subject: subjectRouter,
  planItem: planItemRouter,
  plan: planRouter,
  semester: semesterRouter,
  referenceMaterial: referenceMaterialRouter,
  activeRole: activeRoleRouter,
  task: taskRouter,
  homework: homeworkRouter,
  assessment: assessmentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
