import { BadgeRemoveButton } from "./action/remove";
import { PlanItemBadgeBase } from "./base";

interface Props {
	removable: boolean;

	onRemove: () => Promise<void>;
}

export const SolBadge = ({ removable, onRemove }: Props) => {
	const rightSection = removable && <BadgeRemoveButton onClick={onRemove} />

	return <PlanItemBadgeBase rightSection={rightSection} color="yellow" label="SOL" />
}