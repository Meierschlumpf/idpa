import { LoadingOverlay } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Page404 } from '../../../layout/errors/404';
import { PlanPage } from './_page';

const Page: NextPage = () => {
	const { param } = useRouterParams();

	// On loading
	if (!param) return <LoadingOverlay visible={true} />;

	// On error
	if (!param.match(/^\d{4}-0(1|2)$/)) return <Page404 />;

	// On success
	return <PlanPage semesterId={param} />;
};

export default Page;

const useRouterParams = () => {
	return useRouter().query as {
		param: string;
	};
};
