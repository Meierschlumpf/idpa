import { BadgeRemoveButton } from "./action/remove";
import { PlanItemBadgeBase } from "./base"

interface Props {
	removable: boolean;


	onRemove: () => Promise<void>;
	onSwitch: () => Promise<void>;
}

export const ExcursionBadge = ({ removable, onRemove }: Props) => {
	const rightSection = removable && <BadgeRemoveButton onClick={onRemove} />

	return <PlanItemBadgeBase color="teal" rightSection={rightSection} label="Ausflug" />
}