import { Container } from '@mantine/core';
import type { NextPage } from 'next';
import { BasicLayout } from '../layout/basic';
import { useAuthStore } from '../stores/auth-store';
import { StudentHomePage } from '../components/pages/_student-page';
import { TeacherHomePage } from '../components/pages/_teacher-page';

const Home: NextPage = () => {
  const role = useAuthStore((x) => x.role);

  return (
    <BasicLayout>
      <Container>{role === 'student' ? <StudentHomePage /> : <TeacherHomePage />}</Container>
    </BasicLayout>
  );
};

export default Home;
