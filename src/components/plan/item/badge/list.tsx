import { Group, Menu, Tooltip, ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useMemo } from 'react';
import { PlanItemBadge } from '.';
import { badgeNames } from '../../../../constants/badge';
import { trpc } from '../../../../utils/trpc';
import { BadgeType } from './base';

interface Props {
  handleAddition?: (id: string) => Promise<void>;
  handleRemoval?: (id: string) => Promise<void>;
  handleSwitch?: (id: string, evaluated: boolean) => Promise<void>;
  mode?: 'read' | 'write';
  activeBadges: { id: string; evaluated: boolean }[];
}

export const BadgeList = ({ handleAddition, handleRemoval, handleSwitch, mode, activeBadges }: Props) => {
  const { data: badges } = trpc.planItem.getBadges.useQuery();
  const activeBadgeList = useMemo(
    () =>
      activeBadges.map((ab) => ({
        ...ab,
        name: badges?.find((b) => b.id == ab.id)?.name ?? 'unknown',
      })),
    [activeBadges, badges, ...activeBadges.map((x) => x.evaluated)]
  );

  return (activeBadgeList?.length ?? 0) >= 1 || mode === 'write' ? (
    <Group>
      {activeBadgeList?.map((b) => (
        <PlanItemBadge
          key={b.id}
          variant={b.name as BadgeType}
          mode={mode}
          evaluated={b.evaluated}
          onRemove={async () => (handleRemoval ? await handleRemoval(b.id) : undefined)}
          onSwitch={async () => (handleSwitch ? await handleSwitch(b.id, !b.evaluated) : undefined)}
        />
      ))}
      {mode === 'write' && (badges?.length ?? 0) > activeBadges.length && (
        <Menu withinPortal>
          <Menu.Target>
            <Tooltip label="Badge hinzufügen">
              <ActionIcon>
                <IconPlus size={16} />
              </ActionIcon>
            </Tooltip>
          </Menu.Target>
          <Menu.Dropdown>
            {badges
              ?.filter((x) => !activeBadges.some((y) => y.id === x.id))
              .map((b) => (
                <Menu.Item key={b.id} onClick={async () => (handleAddition ? await handleAddition(b.id) : undefined)}>
                  {badgeNames[b.name as keyof typeof badgeNames]}
                </Menu.Item>
              ))}
          </Menu.Dropdown>
        </Menu>
      )}
    </Group>
  ) : null;
};
