import { Progress } from "antd";
import Icon from "../Icon.jsx";
export default function MatchIndicator({ kind = "skills", value, reason }) {
  const interests = kind === "interest";
  return (
    <div
      className={`match-stat ${interests ? "interest-stat" : "skill-stat"}`}
      data-match={kind}
    >
      <div className={`match-label ${interests ? "purple" : ""}`}>
        <Icon name={interests ? "heart" : "target"} size={14} />
        <span>{interests ? "تطابق الاهتمامات" : "تطابق المهارات"}</span>
        <strong dir="ltr">{value == null ? "غير محسوب" : `${value}%`}</strong>
      </div>
      {value == null ? (
        <p className="match-reason">{reason}</p>
      ) : (
        <Progress
          percent={value}
          showInfo={false}
          size="small"
          strokeColor={interests ? "var(--purple)" : "var(--blue)"}
          trailColor={interests ? "#f3effd" : "#eaf0fa"}
        />
      )}
    </div>
  );
}
