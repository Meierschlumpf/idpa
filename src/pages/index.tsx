import { Container, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { BasicLayout } from "../layout/basic";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>IDPA - Semesterplantool</title>
        <meta name="description" content="A semesterplan tool that has been created as part of an idpa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicLayout>
        <Container>
          <Title order={1}>Hello World</Title>
        </Container>
      </BasicLayout>
    </>
  );
};

export default Home;
