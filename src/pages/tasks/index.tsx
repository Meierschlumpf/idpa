import { Container, LoadingOverlay, Stack, Title, useMantineTheme } from '@mantine/core';
import Head from 'next/head';
import { ErrorOverlay } from '../../components/overlays/error';
import { NoItemsOverlay } from '../../components/overlays/no-items';
import { HomeworkItem } from '../../components/plan/item/homeworks/item';
import { TaskItem } from '../../components/plan/item/tasks/item';
import { BasicLayout } from '../../layout/basic';
import { trpc } from '../../utils/trpc';

const TasksPage = () => {
  const { items, isLoading, isError } = useTasksAndHomeworks(5);

  return (
    <>
      <Head>
        <title>Aufträge | IDPA</title>
      </Head>
      <BasicLayout>
        <Container>
          <Stack>
            <Title order={2}>Aufträge und Hausaufgaben</Title>
            <LoadingOverlay visible={isLoading} />
            <ErrorOverlay visible={isError} />
            <NoItemsOverlay visible={!isLoading && !isError && items.length === 0} />
            {items.map((i) => (i.type === 'task' ? <TaskItem key={i.id} task={i} /> : <HomeworkItem key={i.id} homework={i} />))}
          </Stack>
        </Container>
      </BasicLayout>
    </>
  );
};

export default TasksPage;

const useTasksAndHomeworks = (weekCount: number) => {
  const { data: tasks, ...tasksQuery } = trpc.task.getNextWeeks.useQuery({ weekCount });
  const { data: homeworks, ...homeworksQuery } = trpc.homework.getNextWeeks.useQuery({ weekCount });

  return {
    items: [...(tasks ?? []).map((t) => ({ ...t, type: 'task' })), ...(homeworks ?? []).map((h) => ({ ...h, type: 'homework' }))].sort((a, b) => a.planItem.date.getTime() - b.planItem.date.getTime()),
    isLoading: tasksQuery.isLoading || homeworksQuery.isLoading,
    isError: tasksQuery.isError || homeworksQuery.isError,
  };
};
