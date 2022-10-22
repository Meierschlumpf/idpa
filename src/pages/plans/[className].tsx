import { Container, Title } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { PlansSidebar } from "../../components/sidebars/plans";
import { BasicLayout } from "../../layout/basic";

const ClassSemesterPage: NextPage = () => {
	const router = useRouter();
	const { className } = router.query;

	return <BasicLayout sidebarContent={<PlansSidebar />}>
		<Container>
			<Title order={1}>{className}/general</Title>
		</Container>
	</BasicLayout>
}

export default ClassSemesterPage;