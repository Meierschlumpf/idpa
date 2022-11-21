import { Button, Container, Group, ScrollArea, Stack, Title } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { PlanLessonItem } from '../components/plan/item/lesson';
import { PlanSidebar } from '../components/plan/sidebar';
import { getWeekNumber } from '../helpers/time/get-week-number';
import { BasicLayout } from '../layout/basic';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data: planItems } = trpc.planItem.getAll.useQuery();
  const { data: subjects } = trpc.subject.getAll.useQuery();
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    duration: 100,
  });

  useEffect(() => {
    scrollIntoView();
  }, [scrollIntoView]);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nextId = planItems?.filter((x) => x.date.getTime() >= today.getTime()).sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.id;

  return (
    <>
      <Head>
        <title>IDPA - Semesterplantool</title>
        <meta name="description" content="A semesterplan tool that has been created as part of an idpa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicLayout sidebarContent={<PlanSidebar />}>
        <Container>
          <Group position="apart">
            <Title pb="md">Semesterplan</Title>
            <Button onClick={() => scrollIntoView()} variant="light" color="gray">
              Zur nächsten Lektion springen
            </Button>
          </Group>
          <ScrollArea
            styles={{
              viewport: {
                maxHeight: 'calc(100vh - 300px)',
                width: 'calc(100% - 14px)',
              },
            }}
            viewportRef={scrollableRef}
          >
            <Stack>
              {planItems
                ?.reduce(
                  (
                    list: {
                      week: number;
                      year: number;
                      items: typeof planItems;
                    }[],
                    item
                  ) => {
                    const itemYear = item.date.getFullYear();
                    const itemWeek = getWeekNumber(item.date);
                    const index = list.findIndex((x) => x.year == itemYear && x.week == itemWeek);
                    if (index !== -1) {
                      list[index]!.items.push(item);
                      return list;
                    }
                    list.push({
                      week: itemWeek,
                      year: itemYear,
                      items: [item],
                    });
                    return list;
                  },
                  []
                )
                .map(({ year, week, items }) => {
                  const containsNext = items.some((i) => i.id === nextId);
                  return (
                    <Stack key={`${year}-${week}`} mt="lg" spacing="sm">
                      <Title order={3}>KW {week}</Title>
                      {items
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map((item, i) => (
                          <PlanLessonItem
                            key={item.id}
                            item={item}
                            isNext={containsNext && i === 0}
                            subject={subjects?.find((s) => s.id === item.subjectId)}
                            targetRef={containsNext && i === 0 ? targetRef : undefined}
                            showKw={false}
                          />
                        ))}
                    </Stack>
                  );
                })}
            </Stack>
          </ScrollArea>
        </Container>
      </BasicLayout>
    </>
  );
};

export default Home;
