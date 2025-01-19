export function calculateDaysBetween(startDate: Date, endDate: Date = new Date()): number {
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.floor((endDate.getTime() - startDate.getTime()) / msInDay);
}
