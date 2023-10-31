import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ChatWindow from "./ChatWindow";
import { WebChatContext } from "../../store";

describe("Component Message", () => {
  const webChatMockStore = {
    state: { userName: "John", isRegistered: true },
  };

  it("should render message on conversation", () => {
    window.localStorage.setItem(
      "conversation",
      JSON.stringify([
        {
          message: "Hello",
          userName: "John",
          id: "message-1",
        },
        {
          message: "How are you?",
          userName: "Tom",
          id: "message-2",
        },
      ])
    );

    render(
      <WebChatContext.Provider value={webChatMockStore}>
        <BrowserRouter>
          <ChatWindow />
        </BrowserRouter>
      </WebChatContext.Provider>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("How are you?")).toBeInTheDocument();
  });
});
