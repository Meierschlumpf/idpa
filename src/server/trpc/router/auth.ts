import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user) return {
      ...ctx.session,
      user: undefined
    };
    
    const dbAccount = await ctx.prisma.account.findFirst({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        student: true
      }
    })

    return {
      ...ctx.session,
      user: {
        ...ctx.session?.user,
        role: dbAccount?.is_super_user ? 'admin' : dbAccount?.student ? 'student' : 'teacher'
      }
    };
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
});
