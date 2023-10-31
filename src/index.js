import React from "react";
import ReactDOM from "react-dom/client";

import { WebChat, Register, ChatWindow } from "./components";
import { WebChatProvider } from "./store";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <WebChat />,
    children: [
      {
        path: "register/",
        element: <Register />,
      },
      {
        path: "chat/",
        element: <ChatWindow />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WebChatProvider>
    <RouterProvider router={router} />
  </WebChatProvider>
);
