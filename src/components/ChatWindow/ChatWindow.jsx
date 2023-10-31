import styles from "./ChatWindow.module.scss";
import { useConversation } from "../../hooks";
import { useEffect } from "react";

const ChatWindow = () => {
  const [conversation] = useConversation();

  useEffect(() => {
    console.log("conversation: ", conversation);
  }, [conversation]);

  return (
    <div className={styles.wrapper}>
      <p>chat page</p>
    </div>
  );
};

export default ChatWindow;
