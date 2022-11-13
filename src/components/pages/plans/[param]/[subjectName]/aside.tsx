import { Box, Center, Group, NavLink, Text, Title } from '@mantine/core';
import { IconBooks, IconExternalLink } from '@tabler/icons';
import { trpc } from '../../../../../utils/trpc';

interface SubjectPlanAsideProps {
  semester: string;
  subjectId: string;
}

export const SubjectPlanAside = ({ semester, subjectId }: SubjectPlanAsideProps) => {
  const { data: referenceMaterials, isLoading } = trpc.referenceMaterial.getBySemesterAndSubjectId.useQuery({
    semester: semester,
    subjectId: subjectId,
  });

  return (
    <>
      <Group>
        <IconBooks />
        <Title order={5}>Referenzmaterial</Title>
      </Group>
      {!isLoading && referenceMaterials?.length === 0 ? (
        <Center mt="sm">
          <Text weight={500} size="sm">
            Nichts gefunden!
          </Text>
        </Center>
      ) : (
        <Box sx={{ width: 240 }} mt="sm">
          {referenceMaterials?.map((rm) => (
            <NavLink key={rm.id} label={rm.name} icon={<IconExternalLink />} component="a" target="_blank" href={rm.link} />
          ))}
        </Box>
      )}
    </>
  );
};
