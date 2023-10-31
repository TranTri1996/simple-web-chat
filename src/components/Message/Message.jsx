import classNames from "classnames";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./Message.module.scss";

const Message = ({ className = "", userName, message, onLeftSide }) => {
  return (
    <div
      className={classNames(
        className,
        styles.wrapper,
        onLeftSide ? styles.leftSide : styles.rightSide
      )}
    >
      <p className={styles.userName}>{userName}</p>
      <div className={styles.content}>
        <div className={classNames(styles.message)}>
          <span>{message}</span>
          <div className={styles.arrow} />
        </div>
        <div className={styles.avatar}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  className: PropTypes.string,
  userName: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onLeftSide: PropTypes.bool.isRequired,
};

export default Message;
