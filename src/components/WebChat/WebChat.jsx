import { Outlet } from "react-router-dom";

import styles from "./WebChat.module.scss";

const WebChat = () => {
  return (
    <div className={styles.app}>
      <Outlet />
    </div>
  );
};

export default WebChat;
