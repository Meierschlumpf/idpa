import create from 'zustand';

export const useAuthStore = create<TypeDef>((set, get) => ({
	role: 'student',
	setRole: (role) => set((p) => ({ ...p, role: role as RoleType })),
}));

type RoleType = 'student' | 'teacher';

type TypeDef = {
	role: RoleType;
	setRole: (role: string) => void;
};
