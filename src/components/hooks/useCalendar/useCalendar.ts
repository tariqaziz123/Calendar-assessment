import { useState, useEffect, useCallback, useRef } from "react";
import { isSameMonth } from "date-fns";

export function useCalendar(initialDate: Date) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [displayMonth, setDisplayMonth] = useState<Date>(initialDate);
  const lastInitialDateRef = useRef<number>(initialDate.getTime());

  // Get timestamp for dependency comparison
  const initialDateTimestamp = initialDate.getTime();

  useEffect(() => {
    if (!Number.isNaN(initialDateTimestamp) && initialDateTimestamp !== lastInitialDateRef.current) {
      lastInitialDateRef.current = initialDateTimestamp;
      setSelectedDate(new Date(initialDateTimestamp));
      setDisplayMonth(new Date(initialDateTimestamp));
    }
  }, [initialDateTimestamp]);

  const handleDateClick = useCallback((clickedDate: Date) => {
    setSelectedDate(clickedDate);
    setDisplayMonth((currentMonth: Date) => {
      if (!isSameMonth(clickedDate, currentMonth)) {
        return clickedDate;
      }
      return currentMonth;
    });
  }, []);

  return {
    selectedDate,
    displayMonth,
    setDisplayMonth,
    handleDateClick,
  };
}

