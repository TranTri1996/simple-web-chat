import React from "react";
import { render, screen } from "@testing-library/react";
import { useRouteError } from "react-router-dom";

import PageNotFound from "./PageNotFound";

// Mock the useRouteError hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteError: jest.fn(),
}));

describe("PageNotFound component", () => {
  it("displays a generic error message when no error is provided", () => {
    useRouteError.mockReturnValue({}); // Mock return value with an empty object
    render(<PageNotFound />);
    expect(
      screen.getByText("Sorry, an unexpected error has occurred.")
    ).toBeInTheDocument();
  });

  it("displays the provided error message", () => {
    const testErrorMessage = "Test Error Message";
    useRouteError.mockReturnValue({ message: testErrorMessage });
    render(<PageNotFound />);
    expect(screen.getByText(testErrorMessage)).toBeInTheDocument();
  });

  it("displays the provided status text", () => {
    const testStatusText = "Test Status Text";
    useRouteError.mockReturnValue({ statusText: testStatusText });
    render(<PageNotFound />);
    expect(screen.getByText(testStatusText)).toBeInTheDocument();
  });
});
