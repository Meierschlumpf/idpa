import { Container } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { BasicLayout } from "../../layout/basic";

const Plan: NextPage = () => {
	const router = useRouter();
	const { subjectId } = router.query;

	return (
		<>
			<Head>
				<title>IDPA - Semesterplantool</title>
				<meta name="description" content="A semesterplan tool that has been created as part of an idpa" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<BasicLayout>
				<Container>
					<h1>{subjectId}</h1>
				</Container>
			</BasicLayout>
		</>
	);
};

export default Plan;
