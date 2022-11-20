import { trpc } from '../../../../utils/trpc';
import { HeaderLink } from '../link';

export const StudentHeaderNavigation = () => {
  const { data: currentSemester, isLoading } = trpc.semester.getCurrent.useQuery();

  return (
    <>
      <HeaderLink label="Übersicht" href="/" />
      <HeaderLink label="Pläne" href="/plans" />
      <HeaderLink label={isLoading ? 'Bitte warten...' : currentSemester ? 'Aktueller Plan' : 'Kein Plan gefunden'} disabled={!currentSemester} href={`/plans/${currentSemester?.id}`} />
      <HeaderLink label="Aufträge" href="/tasks" />
      <HeaderLink label="Prüfungen" href="/assessments" />
    </>
  );
};
