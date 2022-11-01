import { Container } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { BasicLayout } from "../layout/basic";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: subjects } = trpc.subject.getAll.useQuery();


  return (
    <>
      <Head>
        <title>IDPA - Semesterplantool</title>
        <meta name="description" content="A semesterplan tool that has been created as part of an idpa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicLayout>
        <Container>

        </Container>
      </BasicLayout>
    </>
  );
};

export default Home;
