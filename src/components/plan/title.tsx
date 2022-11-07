import { Group, Title } from '@mantine/core';
import { TablerIconComponent } from '../tablerIcon';

interface PlanItemProps {
	subject?: { name: string; icon: string } | null;
	semester?: string;
}

export const PlanTitle = ({ subject, semester: planName }: PlanItemProps) => {
	return (
		<>
			<Group align='center'>
				<Title order={2}>
					Semesterplan {subject?.name} {planName}
				</Title>
				{subject && <TablerIconComponent size={24} name={subject?.icon} />}
			</Group>
		</>
	);
};
