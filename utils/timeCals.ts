export const minToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainMins = minutes % 60;
  return {
    hours,
    minutes: remainMins,
  };
};
