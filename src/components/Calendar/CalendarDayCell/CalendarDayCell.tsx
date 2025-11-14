import React from "react";
import { format, isSameDay, isSameMonth } from "date-fns";
import type { CalendarDayCellProps } from "../../types";

export const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  selectedDate,
  displayMonth,
  onDateClick,
  getClassName,
  customStyles,
  classNames,
}) => {
  const isSelected = isSameDay(day, selectedDate);
  const isFadedMonth = !isSameMonth(day, displayMonth);

  const dayClassName = [
    getClassName('day', classNames?.day),
    isFadedMonth ? getClassName('faded', classNames?.faded) : '',
    isSelected ? getClassName('selected', classNames?.selected) : ''
  ].filter(Boolean).join(' ');

  return (
    <td
      className={dayClassName}
      style={{
        ...customStyles?.day,
        ...(isSelected ? customStyles?.selected : {}),
        ...(isFadedMonth ? customStyles?.faded : {}),
      }}
      data-testid={format(day, "d")}
      aria-selected={isSelected || undefined}
      onClick={() => onDateClick(day)}
      role="gridcell"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onDateClick(day);
        }
      }}
    >
      {format(day, "d")}
    </td>
  );
};

