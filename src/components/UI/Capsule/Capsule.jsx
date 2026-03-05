import { useState } from "react";
import styles from "./Capsule.module.scss";

const Capsule = ({
  children,
  className = "",
  tag = "div",
  isBox = false,
  isActive = false,
  legend = undefined,
}) => {
  const Tag = tag;

  return legend === undefined ? (
    <Tag
      className={`${styles.capsule} ${isBox ? styles.capsuleBox : ""} ${isActive ? styles.capsuleActive : ""} ${styles.capsuleNotInteractive} ${className}`}
    >
      {children}
    </Tag>
  ) : (
    <div className={styles.inputWrapper}>
      <span className={styles.capsuleLegend}>{legend}</span>
      <Tag
        className={`${styles.capsule} ${isBox ? styles.capsuleBox : ""} ${isActive ? styles.capsuleActive : ""} ${styles.capsuleNotInteractive} ${className}`}
      >
        {children}
      </Tag>
    </div>
  );
};

const Button = ({
  children,
  className = "",
  isActive = false,
  isBox = false,
  onClickHandler = () => {},
  id = "",
}) => {
  return (
    <button
      className={`${styles.capsule} ${isBox ? styles.capsuleBox : ""} ${isActive ? styles.capsuleActive : ""} ${className}`}
      onClick={onClickHandler}
      type="button"
      id={id}
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

const Input = ({
  type = "text",
  id,
  className = "",
  value,
  onInput = undefined,
  onFocus = undefined,
  onBlur = undefined,
  legend = undefined,
}) => {
  return legend === undefined ? (
    <input
      className={`${styles.capsule} ${styles.capsuleInput} ${className}`}
      type={type}
      id={id}
      value={value}
      onInput={onInput}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  ) : (
    <div className={styles.inputWrapper}>
      <span
        className={styles.capsuleLegend}
        htmlFor={id}
      >
        {legend}
      </span>
      <input
        className={`${styles.capsule} ${styles.capsuleInput} ${className}`}
        type={type}
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

Capsule.Button = Button;
Capsule.Link = Link;
Capsule.Input = Input;

export default Capsule;
