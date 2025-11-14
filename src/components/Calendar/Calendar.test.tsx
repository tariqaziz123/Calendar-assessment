import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Calendar from "./Calendar";

describe("Calendar using date-fns", () => {
  test("renders Month and Year", () => {
    render(<Calendar date="2023-10-15" />);
    expect(screen.getByText("October 2023")).toBeInTheDocument();
  });

  test("renders 7 weekday headings", () => {
    render(<Calendar date="2023-10-15" />);
    expect(screen.getAllByRole("columnheader").length).toBe(7);
  });

  test("highlights selected date", () => {
    render(<Calendar date="2023-10-15" />);
    const cell = screen.getByTestId("15");
    expect(cell).toHaveAttribute("aria-selected", "true");
  });

  test("throws error on invalid date", () => {
    // Suppress console error for this test
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    
    // @ts-ignore
    expect(() => render(<Calendar date="abc" />)).toThrow("Invalid date");
    
    consoleError.mockRestore();
  });

  test("matches snapshot for default calendar", () => {
    const { container } = render(<Calendar date="2023-10-15" />);
    expect(container).toMatchSnapshot();
  });

  test("matches snapshot for calendar with custom styles", () => {
    const customStyles = {
      container: { backgroundColor: "#f0f0f0", padding: "20px" },
      caption: { color: "#333", fontWeight: "bold" },
    };
    const { container } = render(
      <Calendar date="2023-10-15" styles={customStyles} />
    );
    expect(container).toMatchSnapshot();
  });

  test("matches snapshot for calendar with classNames", () => {
    const classNames = {
      container: "custom-container",
      caption: "custom-caption",
      day: "custom-day",
    };
    const { container } = render(
      <Calendar date="2023-10-15" classNames={classNames} />
    );
    expect(container).toMatchSnapshot();
  });

  test("matches snapshot for calendar without default styles", () => {
    const customStyles = {
      container: "custom-container",
      calendar: "custom-calendar",
    };
    const { container } = render(
      <Calendar
        date="2023-10-15"
        customStyles={customStyles}
        useDefaultStyles={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("renders correctly with Date object", () => {
    const { container } = render(<Calendar date={new Date(2023, 9, 15)} />);
    expect(screen.getByText("October 2023")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders correctly with different months", () => {
    const { container: janContainer } = render(
      <Calendar date="2024-01-15" />
    );
    expect(screen.getByText("January 2024")).toBeInTheDocument();
    expect(janContainer).toMatchSnapshot();

    const { container: decContainer } = render(
      <Calendar date="2024-12-25" />
    );
    expect(screen.getByText("December 2024")).toBeInTheDocument();
    expect(decContainer).toMatchSnapshot();
  });

  test("navigates to previous month", async () => {
    render(<Calendar date="2023-10-15" />);
    const prevButton = screen.getByTitle("Previous month");
    
    act(() => {
      fireEvent.click(prevButton);
    });
    
    expect(await screen.findByText("September 2023")).toBeInTheDocument();
  });

  test("navigates to next month", async () => {
    render(<Calendar date="2023-10-15" />);
    const nextButton = screen.getByTitle("Next month");
    
    act(() => {
      fireEvent.click(nextButton);
    });
    
    expect(await screen.findByText("November 2023")).toBeInTheDocument();
  });

  test("navigates to previous year", async () => {
    render(<Calendar date="2023-10-15" />);
    const prevYearButton = screen.getByTitle("Previous year");
    
    act(() => {
      fireEvent.click(prevYearButton);
    });
    
    expect(await screen.findByText("October 2022")).toBeInTheDocument();
  });

  test("navigates to next year", async () => {
    render(<Calendar date="2023-10-15" />);
    const nextYearButton = screen.getByTitle("Next year");
    
    act(() => {
      fireEvent.click(nextYearButton);
    });
    
    expect(await screen.findByText("October 2024")).toBeInTheDocument();
  });

  test("updates when date prop changes", () => {
    const { rerender } = render(<Calendar date="2023-10-15" />);
    expect(screen.getByText("October 2023")).toBeInTheDocument();

    rerender(<Calendar date="2024-01-15" />);
    expect(screen.getByText("January 2024")).toBeInTheDocument();
  });

  test("handles date prop change with different date string", () => {
    const { rerender } = render(<Calendar date="2023-10-15" />);
    expect(screen.getByText("October 2023")).toBeInTheDocument();

    rerender(<Calendar date="2024-06-20" />);
    expect(screen.getByText("June 2024")).toBeInTheDocument();
  });

  test("handles date prop change with Date object", () => {
    const { rerender } = render(<Calendar date={new Date(2023, 9, 15)} />);
    expect(screen.getByText("October 2023")).toBeInTheDocument();

    rerender(<Calendar date={new Date(2024, 2, 10)} />);
    expect(screen.getByText("March 2024")).toBeInTheDocument();
  });

  test("handles useDefaultStyles prop set to false", () => {
    const customStyles = {
      container: "custom-container",
      calendar: "custom-calendar",
    };
    render(
      <Calendar
        date="2023-10-15"
        customStyles={customStyles}
        useDefaultStyles={false}
      />
    );
    expect(screen.getByText("October 2023")).toBeInTheDocument();
  });

  test("handles all custom props together", () => {
    const customStyles = {
      container: { backgroundColor: "#f0f0f0" },
      caption: { color: "#333" },
    };
    const classNames = {
      container: "custom-container",
      day: "custom-day",
    };
    const customStyleModule = {
      calendar: "module-calendar",
    };

    render(
      <Calendar
        date="2023-10-15"
        styles={customStyles}
        classNames={classNames}
        customStyles={customStyleModule}
        useDefaultStyles={true}
      />
    );
    expect(screen.getByText("October 2023")).toBeInTheDocument();
  });

  test("updates selected date when date prop changes multiple times", async () => {
    const { rerender } = render(<Calendar date="2023-10-15" />);
    expect(screen.getByText("October 2023")).toBeInTheDocument();
    expect(screen.getByTestId("15")).toHaveAttribute("aria-selected", "true");

    // Change to a different date in the same month
    rerender(<Calendar date="2023-10-20" />);
    await act(async () => {
      // Wait for useEffect to update
    });
    expect(await screen.findByTestId("20")).toHaveAttribute("aria-selected", "true");

    // Change to a different month
    rerender(<Calendar date="2023-11-05" />);
    await act(async () => {
      // Wait for useEffect to update
    });
    expect(await screen.findByText("November 2023")).toBeInTheDocument();
    expect(await screen.findByTestId("5")).toHaveAttribute("aria-selected", "true");
  });

  test("handles date prop change that triggers useEffect", async () => {
    const { rerender } = render(<Calendar date="2023-10-15" />);
    const initialCell = screen.getByTestId("15");
    expect(initialCell).toHaveAttribute("aria-selected", "true");

    // Change date prop - this should trigger the useEffect that calls handleDateClick
    rerender(<Calendar date="2023-10-25" />);
    
    // Wait for the update to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // The new date should be selected
    const newCell = await screen.findByTestId("25");
    expect(newCell).toHaveAttribute("aria-selected", "true");
  });
});

