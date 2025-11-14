import React from "react";
import { format } from "date-fns";
import type { CalendarNavigationProps } from "../../types";

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  displayMonth,
  onPreviousYear,
  onPreviousMonth,
  onNextMonth,
  onNextYear,
  getClassName,
  customStyles,
  classNames,
}) => (
  <div
    className={getClassName('navigation', classNames?.navigation)}
    style={customStyles?.navigation}
  >
    <button
      type="button"
      className={getClassName('navButton', classNames?.navButton)}
      style={customStyles?.navButton}
      onClick={onPreviousYear}
      aria-label="Previous year"
      title="Previous year"
    >
      ‹‹
    </button>
    <button
      type="button"
      className={getClassName('navButton', classNames?.navButton)}
      style={customStyles?.navButton}
      onClick={onPreviousMonth}
      aria-label="Previous month"
      title="Previous month"
    >
      ‹
    </button>
    <div
      className={getClassName('caption', classNames?.caption)}
      style={customStyles?.caption}
    >
      {format(displayMonth, "MMMM yyyy")}
    </div>
    <button
      type="button"
      className={getClassName('navButton', classNames?.navButton)}
      style={customStyles?.navButton}
      onClick={onNextMonth}
      aria-label="Next month"
      title="Next month"
    >
      ›
    </button>
    <button
      type="button"
      className={getClassName('navButton', classNames?.navButton)}
      style={customStyles?.navButton}
      onClick={onNextYear}
      aria-label="Next year"
      title="Next year"
    >
      ››
    </button>
  </div>
);

