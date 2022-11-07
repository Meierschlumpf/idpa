import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

interface ShowSuccessNotificationProps {
	title?: string;
	message: string;
}

export const showSuccessNotification = ({
	title,
	message,
}: ShowSuccessNotificationProps) => {
	showNotification({
		title: title,
		message,
		icon: <IconCheck size={20} />,
		color: 'teal',
	});
};

/*
 icon={<IconCheck size={20} />} color="green"
*/
