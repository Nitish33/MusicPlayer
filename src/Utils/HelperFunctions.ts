export function getTimeString(timeInMilli: number) {
  const totalSecons = Math.floor(timeInMilli / 1000);

  const minutes = Math.floor(totalSecons / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSecons % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
}
