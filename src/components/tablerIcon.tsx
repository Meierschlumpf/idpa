import * as allIcons from '@tabler/icons';
import { IconCircleOff, TablerIconProps } from '@tabler/icons';

interface TablerIconComponentProps extends TablerIconProps {
	name?: keyof typeof allIcons | string;
}

export const TablerIconComponent = ({
	name,
	...props
}: TablerIconComponentProps) => {
	if (!name) return <IconCircleOff {...props} />;
	const Component = name
		? allIcons[`Icon${name}` as keyof typeof allIcons]
		: IconCircleOff;
	return Component ? <Component {...props} /> : <IconCircleOff {...props} />;
};
