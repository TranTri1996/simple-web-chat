import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { WebChatContext } from "../../store";
import Register from "./Register";

describe("Component Register", () => {
  const webChatMockStore = {
    state: { userName: null, isRegistered: false },
  };

  it("should render successfully", () => {
    render(
      <WebChatContext.Provider value={webChatMockStore}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </WebChatContext.Provider>
    );

    expect(
      screen.getByText("Welcome to the Web Chat, enter your name to continute")
    ).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByTestId("input-name")).toBeInTheDocument();
  });

  it("should show error userName is already existed", async () => {
    window.localStorage.setItem(
      "userInfo",
      JSON.stringify({ John: { isRegistered: true } })
    );

    const webChatMockStore = {
      state: { userName: "John", isRegistered: true },
    };

    render(
      <WebChatContext.Provider value={webChatMockStore}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </WebChatContext.Provider>
    );

    const inputName = screen.getByTestId("input-name");
    userEvent.type(inputName, "John");

    expect(inputName).toHaveValue("John");
    const registerBtn = screen.getByTestId("register");
    userEvent.click(registerBtn);

    await waitFor(() => {
      expect(
        screen.getByText("This name is already existed")
      ).toBeInTheDocument();
    });
  });

  it("should show error when let input field empty", async () => {
    window.localStorage.setItem(
      "userInfo",
      JSON.stringify({ John: { isRegistered: true } })
    );

    const webChatMockStore = {
      state: { userName: "John", isRegistered: true },
    };

    render(
      <WebChatContext.Provider value={webChatMockStore}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </WebChatContext.Provider>
    );

    const registerBtn = screen.getByTestId("register");
    userEvent.click(registerBtn);
    await waitFor(() => {
      expect(screen.getByText("Please enter your name")).toBeInTheDocument();
    });
  });
});
