import { Checkbox } from "antd";
import SkillItem from "./SkillItem.jsx";

export default function SkillExtractionPanel({
  skills,
  selected = [],
  onChange,
  status = "candidate",
  empty = "لا توجد مهارات في هذه المجموعة.",
}) {
  if (!skills.length)
    return (
      <div className="empty">
        <p>{empty}</p>
      </div>
    );
  if (status !== "candidate" || !onChange)
    return (
      <div className="chips">
        {skills.map((skill) => (
          <SkillItem
            key={typeof skill === "string" ? skill : skill.name}
            name={typeof skill === "string" ? skill : skill.name}
            status={status}
          />
        ))}
      </div>
    );
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className={`skill-review ${selected.includes(skill.name) ? "checked" : ""}`}
        >
          <Checkbox
            checked={selected.includes(skill.name)}
            onChange={(event) => onChange(skill.name, event.target.checked)}
          >
            <span className="name">{skill.name}</span>
          </Checkbox>
          <span className="source">{skill.source || "مرشحة"}</span>
          {selected.includes(skill.name) && (
            <span className="check-state">للتأكيد</span>
          )}
        </div>
      ))}
    </div>
  );
}
