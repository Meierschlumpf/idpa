export const formatTime = (date: Date) => {
	const hours = date.getHours();
	const hoursString = hours <= 9 ? `0${hours}` : hours.toString();
	const minutes = date.getMinutes();
	const minutesString = minutes <= 9 ? `0${minutes}` : minutes.toString();
	return `${hoursString}:${minutesString}`;
}