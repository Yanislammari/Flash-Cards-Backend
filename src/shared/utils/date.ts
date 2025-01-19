export function calculateDaysBetween(startDate: Date, endDate: Date): number {
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const msInDay = 1000 * 60 * 60 * 24;
  const daysDifference = Math.round((end.getTime() - start.getTime()) / msInDay);
  return daysDifference;
}
