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
  isActive = false,
  isDisabled = false,
  className = "",
  size = "",
}) => {
  return (
    <button
      type="button"
      className={`
        ${ss.bubble}
        ${ss.interactive}
        ${isActive ? ss.active : ""}
        ${isDisabled ? ss.disabled : ""}
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
  value,
  onChange,
  onFocus,
  legend = "",
  ariaLabel = "",
  className = "",
  size = "",
}) => {
  const input = (
    <input
      className={`${ss.bubble} ${ss.bubbleInput} ${ss.fitContainer} ${className} ${ss[size]}`}
      type="text"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      aria-label={legend ? undefined : ariaLabel}
    />
  );

  if (legend) {
    return (
      <label className={ss.bubbleInputWrapper}>
        <span className={ss.bubbleLegend}>{legend}</span>
        {input}
      </label>
    );
  }

  return <div className={ss.bubbleInputWrapper}>{input}</div>;
};

export default Bubble;
