import { describe, expect, test, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCalendar } from "./useCalendar";

describe("useCalendar", () => {
  const initialDate = new Date(2023, 9, 15); // October 15, 2023

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with provided date", () => {
    const { result } = renderHook(() => useCalendar(initialDate));

    expect(result.current.selectedDate).toEqual(initialDate);
    // displayMonth is initialized to initialDate, not start of month
    expect(result.current.displayMonth).toEqual(initialDate);
  });

  test("updates selected date when date is clicked", () => {
    const { result } = renderHook(() => useCalendar(initialDate));
    const newDate = new Date(2023, 9, 20);

    act(() => {
      result.current.handleDateClick(newDate);
    });

    expect(result.current.selectedDate).toEqual(newDate);
  });

  test("updates display month when clicked date is in different month", () => {
    const { result } = renderHook(() => useCalendar(initialDate));
    const newDate = new Date(2023, 10, 5); // November 5, 2023

    act(() => {
      result.current.handleDateClick(newDate);
    });

    // displayMonth is set to the clicked date when in different month
    expect(result.current.displayMonth).toEqual(newDate);
    expect(result.current.selectedDate).toEqual(newDate);
    // Verify it's actually November
    expect(result.current.displayMonth.getMonth()).toBe(10);
    expect(result.current.displayMonth.getFullYear()).toBe(2023);
  });

  test("does not update display month when clicked date is in same month", () => {
    const { result } = renderHook(() => useCalendar(initialDate));
    const originalMonth = new Date(result.current.displayMonth);
    const newDate = new Date(2023, 9, 25); // Still October

    act(() => {
      result.current.handleDateClick(newDate);
    });

    // displayMonth should remain the same when clicking in same month
    expect(result.current.displayMonth.getTime()).toBe(originalMonth.getTime());
    expect(result.current.selectedDate).toEqual(newDate);
  });

  test("updates display month when setDisplayMonth is called", () => {
    const { result } = renderHook(() => useCalendar(initialDate));
    const newMonth = new Date(2023, 11, 1); // December 2023

    act(() => {
      result.current.setDisplayMonth(newMonth);
    });

    expect(result.current.displayMonth).toEqual(newMonth);
  });

  test("updates selected and display date when initial date changes", () => {
    const { result, rerender } = renderHook(
      ({ date }) => useCalendar(date),
      {
        initialProps: { date: initialDate },
      }
    );

    const newInitialDate = new Date(2024, 0, 10); // January 10, 2024

    rerender({ date: newInitialDate });

    // The hook should update when initial date changes
    expect(result.current.selectedDate.getTime()).toBe(newInitialDate.getTime());
    expect(result.current.displayMonth.getTime()).toBe(newInitialDate.getTime());
    expect(result.current.displayMonth.getMonth()).toBe(0); // January
  });

  test("handles date updates correctly with timestamp comparison", () => {
    const date1 = new Date(2023, 9, 15);
    const { result, rerender } = renderHook(
      ({ date }) => useCalendar(date),
      {
        initialProps: { date: date1 },
      }
    );

    const date2 = new Date(2023, 9, 16);
    rerender({ date: date2 });

    expect(result.current.selectedDate.getTime()).toBe(date2.getTime());
  });
});

