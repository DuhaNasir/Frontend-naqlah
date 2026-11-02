import Button from "../../../shared/components/Button.jsx";
import Badge from "../../../shared/components/Badge.jsx";
import Icon from "../../../shared/components/Icon.jsx";
import MatchIndicator from "../../../shared/components/skills/MatchIndicator.jsx";
import {
  interestMatch,
  questionnaireReady,
  skillMatch,
} from "../services/careerMatching.js";

export default function CareerCard({ career, state, top, mode }) {
  return (
    <article className="career-card" data-career={career.id}>
      <div className="career-icon">
        <Icon name={career.icon} size={24} />
      </div>
      {top && mode && (
        <span className="rank">
          أعلى تطابق {mode === "skills" ? "مهارات" : "اهتمامات"}
        </span>
      )}
      <h3>{career.name}</h3>
      <div className="career-en">{career.en}</div>
      <p>{career.desc}</p>
      <div className="chips">
        {career.skills.slice(0, 3).map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
      {state.logged && (
        <div className="match-pair">
          <MatchIndicator
            value={skillMatch(career, state.confirmed)}
            reason="لا توجد مهارات مؤكدة"
          />
          <MatchIndicator
            kind="interest"
            value={interestMatch(career, state)}
            reason={
              questionnaireReady(state)
                ? "النشاط غير مفهوم؛ مستبعد من الحساب"
                : "لم يُكمل الاستبيان بعد"
            }
          />
        </div>
      )}
      <Button to={`/careers/${career.id}`} variant="secondary">
        استكشاف المسار
      </Button>
    </article>
  );
}
