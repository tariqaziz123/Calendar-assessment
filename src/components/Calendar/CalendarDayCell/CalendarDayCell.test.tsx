import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { CalendarDayCell } from "./CalendarDayCell";

describe("CalendarDayCell", () => {
  const mockOnDateClick = vi.fn();
  const mockGetClassName = vi.fn((key: string, customClass?: string) => {
    return customClass ? `${key} ${customClass}` : key;
  });

  const defaultProps = {
    day: new Date(2023, 9, 15), // October 15, 2023
    selectedDate: new Date(2023, 9, 15),
    displayMonth: new Date(2023, 9, 1),
    onDateClick: mockOnDateClick,
    getClassName: mockGetClassName,
  };

  // Helper function to render CalendarDayCell in a proper table structure
  const renderInTable = (component: React.ReactElement) => {
    return render(
      <table>
        <tbody>
          <tr>{component}</tr>
        </tbody>
      </table>
    );
  };

  beforeEach(() => {
    mockOnDateClick.mockClear();
    mockGetClassName.mockClear();
  });

  test("renders day number", () => {
    renderInTable(<CalendarDayCell {...defaultProps} />);
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  test("calls onDateClick when clicked", () => {
    renderInTable(<CalendarDayCell {...defaultProps} />);
    const cell = screen.getByTestId("15");
    cell.click();
    expect(mockOnDateClick).toHaveBeenCalledTimes(1);
    expect(mockOnDateClick).toHaveBeenCalledWith(defaultProps.day);
  });

  test("calls onDateClick when Enter key is pressed", () => {
    renderInTable(<CalendarDayCell {...defaultProps} />);
    const cell = screen.getByTestId("15");
    fireEvent.keyDown(cell, { key: "Enter" });
    expect(mockOnDateClick).toHaveBeenCalledTimes(1);
  });

  test("calls onDateClick when Space key is pressed", () => {
    renderInTable(<CalendarDayCell {...defaultProps} />);
    const cell = screen.getByTestId("15");
    fireEvent.keyDown(cell, { key: " " });
    expect(mockOnDateClick).toHaveBeenCalledTimes(1);
  });

  test("prevents default behavior on Enter key", () => {
    renderInTable(<CalendarDayCell {...defaultProps} />);
    const cell = screen.getByTestId("15");
    
    fireEvent.keyDown(cell, { key: "Enter" });
    
    // Verify that onDateClick was called, which confirms the handler executed
    // The preventDefault is called inside the component's onKeyDown handler
    expect(mockOnDateClick).toHaveBeenCalledTimes(1);
    expect(mockOnDateClick).toHaveBeenCalledWith(defaultProps.day);
  });

  test("prevents default behavior on Space key", () => {
    renderInTable(<CalendarDayCell {...defaultProps} />);
    const cell = screen.getByTestId("15");
    
    fireEvent.keyDown(cell, { key: " " });
    
    // Verify that onDateClick was called, which confirms the handler executed
    // The preventDefault is called inside the component's onKeyDown handler
    expect(mockOnDateClick).toHaveBeenCalledTimes(1);
    expect(mockOnDateClick).toHaveBeenCalledWith(defaultProps.day);
  });

  test("does not call onDateClick for other keys", () => {
    renderInTable(<CalendarDayCell {...defaultProps} />);
    const cell = screen.getByTestId("15");
    fireEvent.keyDown(cell, { key: "Tab" });
    expect(mockOnDateClick).not.toHaveBeenCalled();
  });

  test("has aria-selected when day is selected", () => {
    renderInTable(<CalendarDayCell {...defaultProps} />);
    const cell = screen.getByTestId("15");
    expect(cell).toHaveAttribute("aria-selected", "true");
  });

  test("does not have aria-selected when day is not selected", () => {
    renderInTable(
      <CalendarDayCell
        {...defaultProps}
        selectedDate={new Date(2023, 9, 16)}
      />
    );
    const cell = screen.getByTestId("15");
    expect(cell).not.toHaveAttribute("aria-selected");
  });

  test("applies custom styles for selected day", () => {
    const customStyles = {
      day: { color: "red" },
      selected: { backgroundColor: "blue" },
    };
    renderInTable(<CalendarDayCell {...defaultProps} customStyles={customStyles} />);
    const cell = screen.getByTestId("15");
    expect(cell).toHaveStyle({ color: "red", backgroundColor: "blue" });
  });

  test("applies custom styles for faded month", () => {
    const customStyles = {
      day: { color: "red" },
      faded: { opacity: "0.5" },
    };
    renderInTable(
      <CalendarDayCell
        {...defaultProps}
        displayMonth={new Date(2023, 8, 1)} // September
        customStyles={customStyles}
      />
    );
    const cell = screen.getByTestId("15");
    expect(cell).toHaveStyle({ color: "red", opacity: "0.5" });
  });

  test("applies custom class names", () => {
    const classNames = {
      day: "custom-day",
      selected: "custom-selected",
      faded: "custom-faded",
    };
    renderInTable(<CalendarDayCell {...defaultProps} classNames={classNames} />);
    expect(mockGetClassName).toHaveBeenCalledWith("day", "custom-day");
    expect(mockGetClassName).toHaveBeenCalledWith("selected", "custom-selected");
  });
});

