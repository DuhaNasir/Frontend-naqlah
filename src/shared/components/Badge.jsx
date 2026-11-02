import Icon from "./Icon.jsx";
export default function Badge({ children, color = "", icon }) {
  return (
    <span className={`badge ${color}`}>
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}
