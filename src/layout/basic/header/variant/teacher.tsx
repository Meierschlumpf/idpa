import { HeaderLink } from '../link';

export const TeacherHeaderNavigation = () => (
  <>
    <HeaderLink label="Übersicht" href="/" />
    <HeaderLink label="Pläne" href="/plans" />
    <HeaderLink label="Plan erstellen" href="/plans/create" />
  </>
);
