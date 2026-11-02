import Icon from "./Icon.jsx";
export default function Notice({
  children,
  icon = "info",
  tone = "",
  className = "",
}) {
  return (
    <div className={`notice ${tone} ${className}`}>
      <Icon name={icon} size={17} />
      <div>{children}</div>
    </div>
  );
}
