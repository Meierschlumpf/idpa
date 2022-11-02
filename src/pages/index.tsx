import { Button, Container, Group, ScrollArea, Stack, Title } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { PlanItem } from "../components/plan/item";
import { PlansSidebar } from "../components/plan/sidebar";
import { BasicLayout } from "../layout/basic";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: planItems } = trpc.plan.getAll.useQuery();
  const { data: subjects } = trpc.subject.getAll.useQuery();
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({ duration: 100 });


  useEffect(() => {
    scrollIntoView();
  }, [])

  // SOL
  // Excursion
  // Ferien
  // Abgabe
  // Präsentation

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nextId = planItems?.filter(x => x.date.getTime() >= today.getTime()).sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.id

  return (
    <>
      <Head>
        <title>IDPA - Semesterplantool</title>
        <meta name="description" content="A semesterplan tool that has been created as part of an idpa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicLayout sidebarContent={<PlansSidebar />}>
        <Container>
          <Group position="apart">
            <Title pb="md">Semesterplan</Title>
            <Button onClick={() => scrollIntoView()} variant="light" color="gray">Zur nächsten Lektion springen</Button>
          </Group>
          <ScrollArea styles={{
            viewport: {
              maxHeight: 'calc(100vh - 300px)',
              width: 'calc(100% - 14px)'
            }
          }}
            viewportRef={scrollableRef}>
            <Stack>
              {planItems?.map(item => <PlanItem key={item.date.getTime()} item={item} subject={subjects?.find(s => s.id === item.subjectId)} isNext={nextId === item.id} targetRef={nextId === item.id ? targetRef : undefined} />)}
            </Stack>
          </ScrollArea>
        </Container>
      </BasicLayout>
    </>
  );
};

export default Home;
