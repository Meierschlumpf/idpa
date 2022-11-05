export const getNextDate = (date: Date) => {
	const now = new Date();
	const today = new Date();
	const week = 1000 * 3600 * 24 * 7;
	const inOneWeek = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() + 8,
	);
	const difference = Math.floor((date.getTime() - today.getTime()) / week);
	return date > inOneWeek
		? difference === 1
			? 'In einer Woche'
			: `In ${difference} Wochen`
		: isToday(date)
		? `Heute`
		: isTomorrow(date)
		? 'Morgen'
		: `Nächsten ${days[date.getDay()]}`;
};

const days = [
	'Sonntag',
	'Montag',
	'Dienstag',
	'Mitwoch',
	'Donnerstag',
	'Freitag',
	'Samstag',
];

const isTomorrow = (date: Date) => {
	const now = new Date();
	const tomorrow = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() + 1,
	);
	return (
		tomorrow.getFullYear() === date.getFullYear() &&
		tomorrow.getMonth() === date.getMonth() &&
		tomorrow.getDate() === date.getDate()
	);
};

const isToday = (date: Date) => {
	const now = new Date();
	return (
		now.getFullYear() === date.getFullYear() &&
		now.getMonth() === date.getMonth() &&
		now.getDate() === date.getDate()
	);
};
