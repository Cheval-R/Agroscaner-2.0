import ss from "./Bubble.module.scss";

const Bubble = ({
  tag = "div",
  children,
  className = "",
  legend = "",
  size = "lg",
}) => {
  const Tag = tag;
  return (
    <Tag
      className={`
        ${ss.bubble}
        ${ss[size]}
        ${className}
      `}
    >
      {legend !== "" ? <span className={ss.bubbleLegend}>{legend}</span> : null}
      {children}
    </Tag>
  );
};

export const BubbleButton = ({
  onClick,
  children,
  isActive,
  isDisabled = false,
  className = "",
  size = "",
  id = "",
}) => {
  return (
    <button
      type="button"
      className={`
        ${ss.bubble}
        ${ss.interactive}
        ${isActive ? ss.active : ""}
        ${isDisabled ? ss.disabled : ""}
        ${ss.fitContainer}
        ${className}
        ${size === "" ? "" : ss[size]}
      `}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const BubbleLink = ({ href, children, className = "" }) => {
  return (
    <a
      href={href}
      className={`
        ${ss.bubble}
        ${ss.interactive}
        ${className}
      `}
    >
      {children}
    </a>
  );
};

export const BubbleInput = ({
  id,
  value,
  onChange,
  onFocus,
  legend = "",
  className = "",
  size = "",
}) => {
  return (
    <div className={ss.bubbleInputWrapper}>
      {legend !== "" ? (
        <label
          className={ss.bubbleLegend}
          htmlFor={id}
        >
          {legend}
        </label>
      ) : null}
      <input
        className={`
          ${ss.bubble}
          ${ss.bubbleInput}
          ${ss.fitContainer}
          ${className}
          ${ss[size]}
        `}
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
};

export default Bubble;
