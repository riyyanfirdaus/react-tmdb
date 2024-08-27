export const formatDate = (date: string) => {
  return date.slice(0, 10).split("-").reverse().join("/");
};

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};
