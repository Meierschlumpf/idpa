import { Container, Title } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { BasicLayout } from "../../../layout/basic";

const SubjectSemesterPage: NextPage = () => {
	const router = useRouter();
	const { className, subjectName } = router.query;

	return <BasicLayout>
		<Container>
			<Title order={1}>{className}/{subjectName}</Title>
		</Container>
	</BasicLayout>
}

export default SubjectSemesterPage;