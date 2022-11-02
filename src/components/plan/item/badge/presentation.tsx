import { BadgeChangeButton } from "./action/change";
import { BadgeRemoveButton } from "./action/remove";
import { PlanItemBadgeBase } from "./base"

interface PresentationBadgeProps {
	removable: boolean;
	evaluated?: boolean;


	onRemove: () => Promise<void>;
	onSwitch: () => Promise<void>;
}

export const PresentationBadge = ({ removable, evaluated, onRemove, onSwitch }: PresentationBadgeProps) => {
	const rightSection = removable && <BadgeRemoveButton onClick={onRemove} />
	const leftSection = removable && <BadgeChangeButton onClick={onSwitch} evaluated={evaluated ?? false} />

	return <PlanItemBadgeBase rightSection={rightSection} leftSection={leftSection} color="orange" label="Präsentation" evaluated={evaluated} />
}