import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import styles from "./WebChat.module.scss";

const WebChat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className={styles.app}>
      <Outlet data-testid="outlet-component" />
    </div>
  );
};

export default WebChat;
