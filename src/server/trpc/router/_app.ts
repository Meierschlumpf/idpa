// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { subjectRouter } from "./subject";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  subject: subjectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
