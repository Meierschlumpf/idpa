import { User } from '@prisma/client';
import create from 'zustand';

export const useStudentsStore = create<UseStudentsStoreType>((set, get) => ({
	added: [],
	removed: [],
	handleSelection: (items) => {
		const reAdded = items.filter((item) =>
			get().removed.some((r) => r.id === item.id),
		);
		const added = items.filter(
			(item) => !get().removed.some((r) => r.id === item.id),
		);

		set((prev) => ({
			...prev,
			added: [...prev.added, ...added],
			removed: prev.removed.filter(
				(r) => !reAdded.some((ra) => r.id === ra.id),
			),
		}));
	},
	remove: (user) => {
		if (get().added.includes(user)) {
			return set((prev) => ({
				...prev,
				added: prev.added.filter((a) => a.id !== user.id),
			}));
		}
		set((prev) => ({
			...prev,
			removed: [...prev.removed, user],
		}));
	},
	reset: () => {
		set((prev) => ({
			...prev,
			added: [],
			removed: [],
		}));
	},
}));

type UseStudentsStoreType = {
	added: User[];
	removed: User[];
	handleSelection: (items: User[]) => void;
	remove: (user: User) => void;
	reset: () => void;
};
