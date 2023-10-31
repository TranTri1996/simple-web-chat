import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WebChatContext } from "../../store";

import styles from "./Register.module.scss";

const Register = () => {
  const navigate = useNavigate();

  const { dispatch } = useContext(WebChatContext);

  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  const typingRef = useRef(null);

  useEffect(() => {
    typingRef.current.focus();
  }, [typingRef]);

  const handleChangeUserName = (e) => {
    if (e.key === "Enter") {
      handleClickEnter();
    }
    setUserName(e.target.value);
  };

  const addUserToLocalStorage = () => {
    const currentUsers = JSON.parse(localStorage.getItem("userInfo")) || {};
    const newUserInfo = {
      ...currentUsers,
      [userName]: {
        isRegistered: true,
      },
    };

    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
  };

  const validateUserName = () => {
    if (userName.trim() === "") {
      setError("Please enter your name");
      return false;
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    if (Object.keys(userInfo).includes(userName.trim())) {
      setError("This name is already existed");
      return false;
    }

    return true;
  };

  const reidrectToChatPage = () => {
    navigate("/chat");
  };

  const handleClickEnter = () => {
    const isValidUserName = validateUserName();
    if (isValidUserName) {
      setError(null);
      addUserToLocalStorage();
      dispatch({
        type: "USER_REGISTER",
        payload: {
          userName,
          isRegistered: true,
        },
      });
      reidrectToChatPage();
    }
  };

  return (
    <div className={styles.wrapper}>
      <p>Welcome to the Web Chat, enter your name to continute</p>
      <div className={styles.registerForm}>
        <input
          type="text"
          value={userName}
          placeholder="Enter your name"
          ref={typingRef}
          onChange={handleChangeUserName}
          onKeyDown={handleChangeUserName}
          className={styles.inputName}
        />
        <button onClick={handleClickEnter} className={styles.enterButton}>
          Enter
        </button>
      </div>
      {<p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Register;
