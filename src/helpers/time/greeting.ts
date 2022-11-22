export const getGreeting = () => {
  const now = new Date();

  if (now.getHours() < 12) return 'Morgen';
  if (now.getHours() < 13) return 'Tag';
  if (now.getHours() < 17) return 'Nachmittag';
  return 'Abend';
};
