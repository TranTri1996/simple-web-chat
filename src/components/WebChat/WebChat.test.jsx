import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WebChat from "./WebChat";
import { useNavigate } from "react-router-dom";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("WebChat component", () => {
  it("should navigate to /register on mount", () => {
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);

    render(
      <BrowserRouter>
        <WebChat />
      </BrowserRouter>
    );

    expect(navigate).toHaveBeenCalledWith("/register");
  });
});
