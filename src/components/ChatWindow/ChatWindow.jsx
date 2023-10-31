import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Message } from "../../components";
import { useConversation } from "../../hooks";
import { WebChatContext } from "../../store";

import styles from "./ChatWindow.module.scss";

const ChatWindow = () => {
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState("");
  const {
    state: { userName, isRegistered },
  } = useContext(WebChatContext);

  useEffect(() => {
    if (!isRegistered) {
      navigate("register/");
    }
  }, [isRegistered, navigate]);

  const [conversation, updateConversation] = useConversation();

  const typingRef = useRef(null);

  useEffect(() => {
    typingRef.current.focus();
  }, [typingRef]);

  const handleSendMessage = () => {
    updateConversation({
      id: `message-id-${Date.now()}`,
      userName,
      message: inputMessage,
    });

    setInputMessage("");
  };

  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
      return;
    }
    setInputMessage(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatHeader}></div>
      <div className={styles.chatBody}>
        {conversation.map((item) => (
          <Message
            key={item.id}
            message={item.message}
            userName={item.userName}
            onLeftSide={item.userName !== userName}
          />
        ))}
      </div>
      <div className={styles.chatFooter}>
        <input
          className={styles.chatInput}
          placeholder="Start Typing...."
          ref={typingRef}
          value={inputMessage}
          onKeyDown={handleInputChange}
          onChange={handleInputChange}
        />
        <button className={styles.sendButton} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
