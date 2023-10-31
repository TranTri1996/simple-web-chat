import { createContext } from "react";

const initialState = {};

const webChatReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
};

const WebChatContext = createContext(initialState);

export { WebChatContext, webChatReducer, initialState };
