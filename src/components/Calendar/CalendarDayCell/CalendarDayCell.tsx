import React, { useMemo, useCallback } from "react";
import { format, isSameDay, isSameMonth } from "date-fns";
import type { CalendarDayCellProps } from "../../types";

export const CalendarDayCell: React.FC<CalendarDayCellProps> = React.memo(({
  day,
  selectedDate,
  displayMonth,
  onDateClick,
  getClassName,
  customStyles,
  classNames,
}) => {
  const isSelected = useMemo(() => isSameDay(day, selectedDate), [day, selectedDate]);
  const isFadedMonth = useMemo(() => !isSameMonth(day, displayMonth), [day, displayMonth]);

  const dayClassName = useMemo(() => {
    return [
      getClassName('day', classNames?.day),
      isFadedMonth ? getClassName('faded', classNames?.faded) : '',
      isSelected ? getClassName('selected', classNames?.selected) : ''
    ].filter(Boolean).join(' ');
  }, [getClassName, classNames, isFadedMonth, isSelected]);

  const cellStyle = useMemo(() => ({
    ...customStyles?.day,
    ...(isSelected ? customStyles?.selected : {}),
    ...(isFadedMonth ? customStyles?.faded : {}),
  }), [customStyles, isSelected, isFadedMonth]);

  const dayNumber = useMemo(() => format(day, "d"), [day]);

  const handleClick = useCallback(() => {
    onDateClick(day);
  }, [onDateClick, day]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onDateClick(day);
    }
  }, [onDateClick, day]);

  return (
    <td
      className={dayClassName}
      style={cellStyle}
      data-testid={dayNumber}
      aria-selected={isSelected || undefined}
      onClick={handleClick}
      role="gridcell"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {dayNumber}
    </td>
  );
});

