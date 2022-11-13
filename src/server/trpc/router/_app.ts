// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { planRouter } from './plan';
import { planItemRouter } from './planitem';
import { referenceMaterialRouter } from './referenceMaterial';
import { semesterRouter } from './semester';
import { subjectRouter } from './subject';

export const appRouter = router({
	subject: subjectRouter,
	planItem: planItemRouter,
	plan: planRouter,
	semester: semesterRouter,
	referenceMaterial: referenceMaterialRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
