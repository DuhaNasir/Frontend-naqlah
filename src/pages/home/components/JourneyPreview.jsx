import Icon from "../../../shared/components/Icon.jsx";
import Badge from "../../../shared/components/Badge.jsx";
import MatchIndicator from "../../../shared/components/skills/MatchIndicator.jsx";

export default function JourneyPreview() {
  return (
    <div className="landing-showcase" aria-label="مثال توضيحي لتجربة نقلة">
      <div className="showcase-caption">
        <span>
          <Icon name="spark" size={17} />
          لمحة عن رحلتك
        </span>
        <Badge>مثال توضيحي</Badge>
      </div>
      <div className="showcase-profile">
        <span className="float-icon">
          <Icon name="code" size={24} />
        </span>
        <div>
          <p>مسار تستكشفه</p>
          <h3>تطوير البرمجيات والويب</h3>
        </div>
        <Badge color="blue">مسار تقني</Badge>
      </div>
      <div className="showcase-skills">
        <span className="small muted">أنت تبني على مهاراتك</span>
        <div className="chips mt8">
          {["HTML", "CSS", "JavaScript", "React"].map((skill) => (
            <span key={skill} className="skill-chip confirmed">
              <span>{skill}</span>
              <Icon name="check" size={12} />
            </span>
          ))}
        </div>
      </div>
      <div className="showcase-matches">
        <MatchIndicator value={67} />
        <MatchIndicator kind="interest" value={75} />
      </div>
      <div className="showcase-next">
        <span className="float-icon teal">
          <Icon name="route" size={21} />
        </span>
        <div>
          <p>خطوتك القادمة في الخطة</p>
          <strong className="ltr">Git → REST APIs → Applied Project</strong>
        </div>
        <Icon name="arrow" size={18} />
      </div>
      <div className="showcase-preserved">
        <Icon name="shield" size={15} />
        كل إنجاز، يبقى معك.
      </div>
    </div>
  );
}
