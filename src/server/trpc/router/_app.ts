// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { planRouter } from './plan';
import { subjectRouter } from './subject';

export const appRouter = router({
	subject: subjectRouter,
	plan: planRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
