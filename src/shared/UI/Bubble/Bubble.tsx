import React, { forwardRef, type JSX, type ReactNode } from "react";
import { type LinkProps,useLocation, useNavigate } from "react-router-dom";

import ss from "./Bubble.module.scss";

interface IBubbleProps {
  children?: ReactNode;
  className?: string;
  bubbleSize?: "sm" | "lg" | "";
  legend?: string;
  legendSize?: "paragraph" | "title";
}

interface IBubbleWrapperProps extends IBubbleProps {
  tag?: keyof JSX.IntrinsicElements;
}

type TButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>["type"];

interface IBubbleLinkProps {
  href: string;
  children: ReactNode;
  className: string;
}

const Bubble = ({
  tag = "div",
  children,
  className = "",
  legend = "",
  bubbleSize = "",
  legendSize = "paragraph",
}: IBubbleWrapperProps) => {
  const Tag = tag;
  return (
    <Tag
      className={`
        ${ss.bubble}
        ${ss[bubbleSize]}
        ${className}
      `}
    >
      {legend !== "" ? (
        <span className={`${ss.bubbleLegend} ${legendSize === "title" ? ss.bubbleLegendBold : ""}`}>{legend}</span>
      ) : null}
      {children}
    </Tag>
  );
};

interface IBubbleButtonProps extends IBubbleProps {
  onClick?: (e: React.MouseEvent) => void;
  isActive?: boolean;
  isDisabled?: boolean;
  type?: TButtonType;
}

export const BubbleButton = ({
  onClick,
  children,
  isActive = false,
  isDisabled = false,
  className = "",
  bubbleSize = "",
  type = "button",
}: IBubbleButtonProps) => {
  return (
    <button
      type={type}
      className={`
        ${ss.bubble}
        ${ss.interactive}
        ${isActive ? ss.active : ""}
        ${isDisabled ? ss.disabled : ""}
        ${className}
        ${bubbleSize === "" ? "" : ss[bubbleSize]}
      `}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const BubbleLink = ({ href, children, className = "" }: IBubbleLinkProps) => {
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

interface IBubbleRouterLinkProps extends IBubbleProps {
  to: LinkProps["to"];
}

export const BubbleRouterLink = ({ to, children, className = "", bubbleSize = "" }: IBubbleRouterLinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <BubbleButton
      bubbleSize={bubbleSize}
      isActive={location.pathname.split("/")[1] === to}
      className={className}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        if (!(location.pathname.split("/")[1] === to)) {
          navigate(to);
        }
      }}
    >
      {children}
    </BubbleButton>
  );
};

interface IBubbleInputProps extends IBubbleProps {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  inputType?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  name?: string;
  errorMessage: string | undefined | null;
  id?: string;
}

export const BubbleInput = forwardRef(function BubbleInput(
  {
    value,
    onChange,
    onFocus,
    onBlur,
    legend = "",
    inputType = "text",
    className = "",
    bubbleSize = "",
    name = "",
    errorMessage = null,
    id = "",
  }: IBubbleInputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const input = (
    <input
      className={`${ss.bubble} ${ss.bubbleInput} ${ss.fitContainer} ${className} ${errorMessage ? ss.error : ""} ${ss[bubbleSize]}`}
      type={inputType}
      step={0.001}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      ref={ref}
      name={name}
      style={{ MozAppearance: "none", WebkitAppearance: "none" }}
      id={id}
    />
  );

  return (
    <label className={ss.bubbleInputWrapper}>
      {legend ? <span className={ss.bubbleLegend}>{legend}</span> : null}
      {input}
      {errorMessage ? <span className={ss.bubbleError}>{errorMessage}</span> : null}
    </label>
  );
});

export default Bubble;
