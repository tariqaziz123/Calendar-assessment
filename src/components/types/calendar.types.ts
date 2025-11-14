import type { CSSProperties } from "react";

export type CalendarStyles = {
  container?: CSSProperties;
  navigation?: CSSProperties;
  navButton?: CSSProperties;
  caption?: CSSProperties;
  calendar?: CSSProperties;
  weekday?: CSSProperties;
  day?: CSSProperties;
  selected?: CSSProperties;
  faded?: CSSProperties;
};

export type CalendarClassNames = {
  container?: string;
  navigation?: string;
  navButton?: string;
  caption?: string;
  calendar?: string;
  weekday?: string;
  day?: string;
  selected?: string;
  faded?: string;
};

export type CustomStyles = {
  [key: string]: string;
};

export type CalendarProps = {
  date: Date | string;
  styles?: CalendarStyles;
  classNames?: CalendarClassNames;
  customStyles?: CustomStyles;
  useDefaultStyles?: boolean;
};

export type CalendarDayCellProps = {
  day: Date;
  selectedDate: Date;
  displayMonth: Date;
  onDateClick: (date: Date) => void;
  getClassName: (key: string, customClass?: string) => string;
  customStyles?: CalendarStyles;
  classNames?: CalendarClassNames;
};

export type CalendarNavigationProps = {
  displayMonth: Date;
  onPreviousYear: () => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onNextYear: () => void;
  getClassName: (key: string, customClass?: string) => string;
  customStyles?: CalendarStyles;
  classNames?: CalendarClassNames;
};

