import { HeaderLink } from '../link';

export const TeacherHeaderNavigation = () => (
  <>
    <HeaderLink label="Übersicht" href="/" />
    <HeaderLink label="Semesterpläne" href="/plans" />
    <HeaderLink label="Semesterplan erstellen" href="/plans/create" />
  </>
);
