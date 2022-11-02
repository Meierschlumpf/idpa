import { BadgeChangeButton } from "./action/change";
import { BadgeRemoveButton } from "./action/remove";
import { PlanItemBadgeBase } from "./base"

interface SubmissionBadgeProps {
	removable: boolean;
	evaluated?: boolean;


	onRemove: () => Promise<void>;
	onSwitch: () => Promise<void>;
}

export const SubmissionBadge = ({ evaluated, removable, onRemove, onSwitch }: SubmissionBadgeProps) => {
	const rightSection = removable && <BadgeRemoveButton onClick={onRemove} />
	const leftSection = removable && <BadgeChangeButton onClick={onSwitch} evaluated={evaluated ?? false} />

	return <PlanItemBadgeBase rightSection={rightSection} leftSection={leftSection} color="red" label="Abgabe" evaluated={evaluated} />
}