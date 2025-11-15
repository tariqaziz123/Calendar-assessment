import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";

/**
 * Generates an array of weeks given a display month.
 * Each week is an array of 7 dates, with the first date being the
 * start of the week and the last date being the end of the week.
 * The weeks are generated for the range of dates from the start of the
 * display month to the end of the display month, inclusive.
 * @param displayMonth - The month for which to generate weeks.
 * @returns An array of weeks, where each week is an array of 7 dates.
 */
export function generateCalendarWeeks(displayMonth: Date): Date[][] {
  const monthStart = startOfMonth(displayMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const weeks: Date[][] = [];
  let current = calendarStart;

  while (current <= calendarEnd) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(current);
      current = addDays(current, 1);
    }
    weeks.push(week);
  }

  return weeks;
}

export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

