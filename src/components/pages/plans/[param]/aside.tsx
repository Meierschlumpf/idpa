import { Box, Center, Group, NavLink, Text, Title } from '@mantine/core';
import { IconBooks, IconExternalLink } from '@tabler/icons';
import { trpc } from '../../../../utils/trpc';
import { TablerIconComponent } from '../../../tablerIcon';

interface PlanAsideProps {
  semester: string;
}

export const PlanAside = ({ semester }: PlanAsideProps) => {
  const { data: referenceMaterialSubjects, isLoading } = trpc.referenceMaterial.getBySemester.useQuery({
    semester: semester,
  });

  return (
    <>
      <Group>
        <IconBooks />
        <Title order={5}>Referenzmaterial</Title>
      </Group>
      {!isLoading && referenceMaterialSubjects?.length === 0 ? (
        <Center mt="sm">
          <Text weight={500} size="sm">
            Nichts gefunden!
          </Text>
        </Center>
      ) : (
        <Box sx={{ width: 240 }} mt="sm">
          {referenceMaterialSubjects?.map((sub) => (
            <NavLink key={sub.id} label={sub.name} icon={<TablerIconComponent name={sub.icon} />} childrenOffset={28}>
              {sub.materials.map((rm) => (
                <NavLink key={rm.id} label={rm.name} icon={<IconExternalLink />} component="a" target="_blank" href={rm.link} />
              ))}
            </NavLink>
          ))}
        </Box>
      )}
    </>
  );
};
