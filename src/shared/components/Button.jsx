import { Button as AntButton } from "antd";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function Button({
  children,
  to,
  variant = "primary",
  icon = "arrow",
  className = "",
  small = false,
  ...props
}) {
  const classes = `btn ${variant} ${small ? "sm" : ""} ${className}`;
  const content = (
    <span className="button-content">
      {children}
      {icon && <Icon name={icon} size={17} />}
    </span>
  );
  if (to)
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  return (
    <AntButton
      type={
        variant === "primary"
          ? "primary"
          : variant === "ghost"
            ? "text"
            : "default"
      }
      className={classes}
      {...props}
    >
      {content}
    </AntButton>
  );
}
