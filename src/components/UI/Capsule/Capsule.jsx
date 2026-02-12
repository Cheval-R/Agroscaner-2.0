import styles from "./Capsule.module.scss";

const Capsule = ({
  children,
  className = "",
  tag = "div",
  isBox = false,
  isActive = false,
}) => {
  const Tag = tag;
  return (
    <Tag
      className={`${styles.capsule} ${isBox ? styles.capsuleBox : ""} ${isActive ? styles.capsuleActive : ""} ${styles.capsuleNotInteractive} ${className}`}
    >
      {children}
    </Tag>
  );
};

const Button = ({
  children,
  className = "",
  isActive = false,
  isBox = false,
  onClickHandler = () => {},
}) => {
  return (
    <button
      className={`${styles.capsule} ${isBox ? styles.capsuleBox : ""} ${isActive ? styles.capsuleActive : ""} ${className}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};
const Link = ({
  children,
  href,
  className = "",
  isActive = false,
  isBox = false,
}) => {
  return (
    <a
      className={`${styles.capsule} ${isBox ? styles.capsuleBox : ""} ${isActive ? styles.capsuleActive : ""} ${className}`}
      href={href}
    >
      {children}
    </a>
  );
};

Capsule.Button = Button;
Capsule.Link = Link;

export default Capsule;
