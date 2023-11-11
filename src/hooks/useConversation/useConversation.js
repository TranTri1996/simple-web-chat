import { useState, useEffect } from "react";

const useConversation = () => {
  const [conversation, setConversation] = useState(
    JSON.parse(localStorage.getItem("conversation")) || []
  );
  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e.key === "conversation") {
        setConversation(JSON.parse(e.newValue));
      }
    });
  }, []);

  const updateConversation = (message) => {
    const newConversation = [...conversation, message];
    setConversation(newConversation);
    localStorage.setItem("conversation", JSON.stringify(newConversation));
    window.dispatchEvent(new Event("storage"));
  };

  return [conversation, updateConversation];
};

export default useConversation;
