export const calulateDuration = (startTime: Date, endTime: Date) => {
  const diffInMs = endTime.getTime() - startTime.getTime();

  const duration = Math.floor(diffInMs / (60 * 1000));

  return duration;
};
