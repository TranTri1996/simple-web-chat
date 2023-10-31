import styles from "./Message.module.scss";

const Message = ({ userName, message, onLeftSide }) => {
  return (
    <div className={styles.wrapper}>
      <p>{`${userName}: ${message}`}</p>
    </div>
  );
};

export default Message;
