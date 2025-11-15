import { addMonths, subMonths, addYears, subYears } from "date-fns";
import { useEffect, useMemo, useCallback } from "react";
import styles from "./Calendar.module.css";
import type { CalendarProps } from "../types";
import { generateCalendarWeeks, WEEKDAYS, getClassName as getClassNameHelper } from "../utils";
import { useCalendar } from "../hooks";
import { CalendarNavigation } from "./CalendarNavigation";
import { CalendarDayCell } from "./CalendarDayCell";

/**
 * A flexible and customizable React calendar component built with TypeScript and date-fns.
 * @param {Object} props - The props object passed to the component
 * @param {Date} props.date - The initial date to display and select
 * @param {Object} props.styles - Optional inline styles for calendar elements
 * @param {Object} props.classNames - Optional custom CSS class names for calendar elements
 * @param {Object} props.customStyles - Optional CSS module class names for calendar elements
 * @param {Boolean} props.useDefaultStyles - Whether to use default styles
 * @returns {ReactElement} The rendered calendar component
 */
export default function Calendar({ 
  date, 
  styles: customStyles, 
  classNames,
  customStyles: customStyleModule,
  useDefaultStyles = true
}: Readonly<CalendarProps>) {
  // Memoize the initial date to prevent unnecessary re-renders
  const initialDate = useMemo(() => {
    const d = new Date(date);
    if (Number.isNaN(d.valueOf())) throw new Error("Invalid date");
    return d;
  }, [date]);

  const { selectedDate, displayMonth, setDisplayMonth, handleDateClick } = useCalendar(initialDate);

  // Update when date prop changes (using timestamp to avoid object reference issues)
  const dateTimestamp = useMemo(() => initialDate.getTime(), [initialDate]);

  useEffect(() => {
    handleDateClick(new Date(dateTimestamp));
  }, [dateTimestamp, handleDateClick]);

  const handlePreviousMonth = useCallback(() => {
    setDisplayMonth(subMonths(displayMonth, 1));
  }, [displayMonth, setDisplayMonth]);

  const handleNextMonth = useCallback(() => {
    setDisplayMonth(addMonths(displayMonth, 1));
  }, [displayMonth, setDisplayMonth]);

  const handlePreviousYear = useCallback(() => {
    setDisplayMonth(subYears(displayMonth, 1));
  }, [displayMonth, setDisplayMonth]);

  const handleNextYear = useCallback(() => {
    setDisplayMonth(addYears(displayMonth, 1));
  }, [displayMonth, setDisplayMonth]);

  const weeks = useMemo(() => generateCalendarWeeks(displayMonth), [displayMonth]);

  // Helper function to merge class names
  const getClassName = useMemo(
    () => (defaultKey: keyof typeof styles, customClass?: string) => {
      return getClassNameHelper(
        styles[defaultKey],
        String(defaultKey),
        customStyleModule,
        customClass,
        useDefaultStyles
      );
    },
    [customStyleModule, useDefaultStyles]
  );

  return (
    <div
      className={getClassName('calendarContainer', classNames?.container)}
      style={customStyles?.container}
    >
      <CalendarNavigation
        displayMonth={displayMonth}
        onPreviousYear={handlePreviousYear}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onNextYear={handleNextYear}
        getClassName={getClassName}
        customStyles={customStyles}
        classNames={classNames}
      />
      <table
        className={getClassName('calendar', classNames?.calendar)}
        style={customStyles?.calendar}
      >
        <thead>
          <tr>
            {WEEKDAYS.map((day) => (
              <th
                key={day}
                className={getClassName('weekday', classNames?.weekday)}
                style={customStyles?.weekday}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week: Date[]) => (
            <tr key={week[0].getTime()}>
              {week.map((day: Date) => (
                <CalendarDayCell
                  key={day.getTime()}
                  day={day}
                  selectedDate={selectedDate}
                  displayMonth={displayMonth}
                  onDateClick={handleDateClick}
                  getClassName={getClassName}
                  customStyles={customStyles}
                  classNames={classNames}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

