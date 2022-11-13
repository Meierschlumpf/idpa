import { Button, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { IconHomeCheck, TablerIcon } from '@tabler/icons';

interface TaskButtonProps {
  tooltipLabel: string;
  type: 'read' | 'write';
  count: number;
  totalCount: number;
  onClick: () => Promise<void> | void;
  icon: TablerIcon;
}

export const TaskButton = ({ tooltipLabel, type, count, totalCount, onClick, icon: Icon }: TaskButtonProps) => {
  const { colors } = useMantineTheme();

  const nothingColor = type === 'write' ? colors.red[6] : colors.gray[6];
  const doneColor = colors.teal[6];

  const getButtonColor = (count: number, totalCount: number) => {
    if (totalCount === 0) return nothingColor;
    if (totalCount === count) return doneColor;
    return undefined;
  };

  const getButtonText = (count: number, totalCount: number) => {
    if (totalCount === 0) return 'Nichts';
    if (totalCount === count) return 'Erledigt';
    return `${count} von ${totalCount}`;
  };

  const color = getButtonColor(count, totalCount);

  return (
    <Tooltip label={tooltipLabel}>
      <Button compact variant="subtle" onClick={onClick} color="gray" rightIcon={<Icon color={color} stroke={1.5} size={16} />}>
        <Text color={color}>{getButtonText(count, totalCount)}</Text>
      </Button>
    </Tooltip>
  );
};
