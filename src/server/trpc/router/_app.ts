// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { planRouter } from './plan';
import { planItemRouter } from './planitem';
import { subjectRouter } from './subject';

export const appRouter = router({
	subject: subjectRouter,
	planItem: planItemRouter,
	plan: planRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
