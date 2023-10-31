import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Message } from "../../components";
import { useConversation, useMoreMessages } from "../../hooks";
import { WebChatContext } from "../../store";

import styles from "./ChatWindow.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ChatWindow = () => {
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState("");

  const {
    state: { userName, isRegistered },
  } = useContext(WebChatContext);

  const [conversation, updateConversation] = useConversation();

  const {
    messages: moreMessages,
    loading,
    fetchMessages,
  } = useMoreMessages(25);

  const typingRef = useRef(null);

  const conversationRef = useRef(null);

  const handleScroll = useCallback(
    (e) => {
      if (e.currentTarget.scrollTop === 0) {
        fetchMessages();
      }
    },
    [fetchMessages]
  );

  useEffect(() => {
    if (!isRegistered) {
      navigate("register/");
    }
  }, [isRegistered, navigate]);

  useEffect(() => {
    const conversationElement = conversationRef.current;
    conversationElement.addEventListener("scroll", handleScroll);

    return () => {
      conversationElement.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const conversation = document.getElementById("conversation");
    conversation.scrollTop = conversation.scrollHeight;
  }, [conversation]);

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
      <div className={styles.chatBody} id="conversation" ref={conversationRef}>
        {loading && (
          <FontAwesomeIcon
            className={styles.loadingIcon}
            icon={faSpinner}
            spin
          />
        )}
        {[...moreMessages, ...conversation].map((item) => (
          <Message
            key={item.id}
            message={item.message}
            className="chatMessage"
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
