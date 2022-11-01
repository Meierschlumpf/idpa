// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { authRouter } from './auth';
import { subjectRouter } from './subject';
import { classRouter } from './class';
import { userRouter } from './user';

export const appRouter = router({
	auth: authRouter,
	subject: subjectRouter,
	class: classRouter,
	user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
