import React from "react";
import { render, screen } from "@testing-library/react";

import Message from "./Message";

describe("Component Message", () => {
  it("should render successfully", () => {
    render(<Message message="Hello" userName="John" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
