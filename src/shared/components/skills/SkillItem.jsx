import Icon from "../Icon.jsx";
const labels = {
  candidate: "مرشحة",
  confirmed: "مؤكدة",
  covered: "غطّاها مقرر",
  missing: "ناقصة",
};
export default function SkillItem({ name, status = "confirmed" }) {
  return (
    <span className={`skill-chip ${status}`}>
      <span dir="ltr">{name}</span>
      <span>· {labels[status]}</span>
      {status === "confirmed" && <Icon name="check" size={11} />}
    </span>
  );
}
