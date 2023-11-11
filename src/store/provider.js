import { useMemo, useReducer } from "react";

import { WebChatContext, webChatReducer, initialState } from "./context";

export const WebChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(webChatReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <WebChatContext.Provider value={value}>{children}</WebChatContext.Provider>
  );
};
