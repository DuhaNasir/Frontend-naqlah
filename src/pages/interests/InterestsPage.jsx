import { useRef } from "react";
import { Alert, Progress, Radio } from "antd";
import Button from "../../shared/components/Button.jsx";
import Stepper from "../../shared/components/Stepper.jsx";
import Notice from "../../shared/components/Notice.jsx";
import { careerPaths } from "../careers/services/careerCatalog.js";
import useInterestQuestionnaire from "./hooks/useInterestQuestionnaire.js";

export default function InterestsPage() {
  const { interests, setAnswer, submit, missing, answered } =
    useInterestQuestionnaire();
  const refs = useRef({});
  return (
    <div className="max-w-3xl mx-auto">
      <Stepper step={4} />
      <div className="onboard-heading">
        <div
          className="eyebrow"
          style={{ justifyContent: "center", color: "var(--purple)" }}
        >
          لم تحدد مجالًا بعد؟ لنستكشف اهتماماتك.
        </div>
        <h1>أي الأنشطة أقرب إليك؟</h1>
        <p>أكمل الأسئلة السبعة لعرض المسارات. لا توجد إجابة صحيحة أو خاطئة.</p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const first = submit();
          if (first) {
            refs.current[first]?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            refs.current[first]
              ?.querySelector("input")
              ?.focus({ preventScroll: true });
          }
        }}
      >
        <div className="survey-progress">
          <div className="spread">
            <strong>استبيان الاهتمامات</strong>
            <span>{answered} من 7 أسئلة مجابة</span>
          </div>
          <Progress
            percent={Math.round((answered / 7) * 100)}
            showInfo={false}
            strokeColor="var(--purple)"
          />
        </div>
        <Notice icon="heart" className="interest-notice">
          قيّم اهتمامك من 1 إلى 5. كل سؤال يتطلب إجابة؛ «لا أفهم هذا النشاط»
          إجابة مسموحة وتُستبعد من حساب التطابق. البنود المعروضة توضيحية
          للنموذج.
        </Notice>
        {missing.length > 0 && (
          <Alert
            className="mt16"
            type="error"
            showIcon
            title={`أجب عن جميع الأسئلة قبل عرض النتائج. تبقى ${missing.length} أسئلة.`}
          />
        )}
        {careerPaths.map((career, index) => (
          <section
            key={career.id}
            className={`interests-question ${missing.includes(career.id) ? "question-error" : ""}`}
            ref={(element) => {
              refs.current[career.id] = element;
            }}
          >
            <h3 id={`question-${career.id}`}>
              <span className="question-n">0{index + 1}</span>
              {career.activity}
            </h3>
            <Radio.Group
              className="survey-radios"
              aria-labelledby={`question-${career.id}`}
              aria-required="true"
              name={`interest-${career.id}`}
              value={interests[career.id]}
              onChange={(event) => setAnswer(career.id, event.target.value)}
            >
              <div className="ratings">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Radio
                    key={value}
                    value={value}
                    className={`rating ${interests[career.id] === value ? "selected" : ""}`}
                  >
                    {value}
                  </Radio>
                ))}
              </div>
              <div className="rating-labels">
                <span>لا يثير اهتمامي</span>
                <span>يثير اهتمامي جدًا</span>
              </div>
              <Radio value={0} className="unknown">
                لا أفهم هذا النشاط
              </Radio>
            </Radio.Group>
          </section>
        ))}
        <div className="actions">
          <Button to="/careers" variant="ghost" icon={false}>
            رجوع لسؤال المجال
          </Button>
          <Button htmlType="submit">عرض نتائج المسارات</Button>
        </div>
        <p className="small mt16">
          تظهر نسبتا المهارات والاهتمامات منفصلتين. يُرتب العرض بالمهارات
          المؤكدة إن وجدت، وبالاهتمامات عند عدم وجودها.
        </p>
      </form>
    </div>
  );
}
