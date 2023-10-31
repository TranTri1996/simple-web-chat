import { createContext } from "react";

const initialState = {
  userName: null,
  isRegistered: false,
};

const webChatReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_REGISTER":
      return {
        ...state,
        userName: payload.userName,
        isRegistered: true,
      };
    default:
      return state;
  }
};

const WebChatContext = createContext(initialState);

export { WebChatContext, webChatReducer, initialState };
