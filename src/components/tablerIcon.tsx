import * as allIcons from "@tabler/icons";
import { IconCrossOff, TablerIconProps } from "@tabler/icons";

interface TablerIconComponentProps extends TablerIconProps {
	name: keyof typeof allIcons | string;
}

export const TablerIconComponent = ({ name, ...props }: TablerIconComponentProps) => {
	const Component = name ? allIcons[`Icon${name}` as keyof typeof allIcons] : () => <></>;
	if (!Component) <IconCrossOff {...props} />;
	return <Component {...props} />
}