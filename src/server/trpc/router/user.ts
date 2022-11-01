import { User } from '@prisma/client';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const userRouter = router({
	getNotInClass: protectedProcedure
		.input(
			z.object({
				classId: z.string().nullish(),
			}),
		)
		.query(({ ctx, input }) => {
			const date = new Date(1, 1, 1970);
			const values: User[] = [];
			for (let i = 0; i < 100; i++) {
				values.push({
					id: i.toString(),
					name: ctx.session.user.name + i.toString() ?? 'unknown',
					email: ctx.session.user.email ?? 'unknown@gibb.ch',
					image: ctx.session.user.image ?? '',
					emailVerified: date,
				});
			}
			return values;
		}),
});
