import { LoadingOverlay } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Page404 } from '../../../../layout/errors/404';
import { SubjectPlanPage } from '../../../../components/pages/plans/[param]/[subjectName]/_page';

const Page: NextPage = () => {
  const { param, subjectName } = useRouterParams();

  // On loading
  if (!param || !subjectName) return <LoadingOverlay visible={true} />;

  // On error
  if (!param.match(/^\d{4}-0(1|2)$/)) return <Page404 />;

  // On success
  return <SubjectPlanPage semesterId={param} subjectName={subjectName} />;
};

export default Page;

const useRouterParams = () => {
  return useRouter().query as {
    param: string;
    subjectName: string;
  };
};
