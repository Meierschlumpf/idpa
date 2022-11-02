import { BadgeRemoveButton } from "./action/remove";
import { PlanItemBadgeBase } from "./base";

interface Props {
	removable: boolean;
	onRemove: () => Promise<void>;
}

export const ExamBadge = ({ removable, onRemove }: Props) => {

	const rightSection = removable && <BadgeRemoveButton onClick={onRemove} />

	return <PlanItemBadgeBase color="blue" label="Prüfung" rightSection={rightSection} evaluated />
}