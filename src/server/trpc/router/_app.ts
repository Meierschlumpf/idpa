// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { subjectRouter } from './subject';

export const appRouter = router({
	subject: subjectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
