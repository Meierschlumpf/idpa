import { BadgeType } from "./base"
import { ExamBadge } from "./exam";
import { ExcursionBadge } from "./excursion";
import { PresentationBadge } from "./presentation";
import { SolBadge } from "./sol";
import { SubmissionBadge } from "./submission";

interface Props {
	variant: BadgeType;
	mode: 'read' | 'write' | undefined;
	evaluated?: boolean;

	onRemove: () => Promise<void>;
	onSwitch: () => Promise<void>;
}

export const PlanItemBadge = ({ variant, mode, evaluated, ...actions }: Props) => {
	if (variant === 'exam') return <ExamBadge removable={mode === 'write'} {...actions} />;
	if (variant === 'excursion') return <ExcursionBadge removable={mode === 'write'} {...actions} />;
	if (variant === 'presentation') return <PresentationBadge removable={mode === 'write'} evaluated={evaluated} {...actions} />;
	if (variant === 'sol') return <SolBadge removable={mode === 'write'} {...actions} />;
	if (variant === 'submission') return <SubmissionBadge removable={mode === 'write'} evaluated={evaluated} {...actions} />;
	return <></>
}