import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CareerCard from "./components/CareerCard.jsx";
import { careerPaths } from "./services/careerCatalog.js";
import {
  questionnaireReady,
  rankCareers,
  rankingMode,
} from "./services/careerMatching.js";
import { useNaqlah } from "../../shared/context/NaqlahContext.jsx";
import Button from "../../shared/components/Button.jsx";
import Badge from "../../shared/components/Badge.jsx";
import Notice from "../../shared/components/Notice.jsx";
import Stepper from "../../shared/components/Stepper.jsx";

export default function CareersPage() {
  const { state, patch } = useNaqlah();
  const navigate = useNavigate();
  const results = useRef(null);
  const ready = questionnaireReady(state);
  const show =
    !state.logged ||
    state.pathMode === "direct" ||
    (state.pathMode === "interest" && ready);
  const mode = state.logged ? rankingMode(state) : "";
  useEffect(() => {
    if (state.pathMode === "direct")
      results.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state.pathMode]);
  const discover = () => {
    patch({ pathMode: "interest", interestSubmitted: false });
    navigate("/interests");
  };
  return (
    <div className="public-container">
      {state.logged && state.onboarding && <Stepper step={4} />}
      <div className="careers-intro">
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          {state.logged ? "الخطوة التالية، قرارك" : "اكتشف احتمالاتك"}
        </div>
        <h1>
          {state.logged
            ? "هل أنت مهتم بمجال تقني معين؟"
            : "سبعة مسارات، وبدايات كثيرة."}
        </h1>
        <p>
          {state.logged
            ? "اختر إجابتك أولًا. إن لم تحدد مجالًا بعد، يساعدك الاستبيان على استكشاف اهتماماتك."
            : "تعرّف على المسارات، ثم أنشئ حسابك لتراجع مهاراتك وتبني خطتك."}
        </p>
      </div>
      {state.logged && (
        <section
          className="path-question"
          aria-label="اختيار طريقة تحديد المسار"
        >
          <div className="decision">
            <button
              className={`choice-card ${state.pathMode === "direct" ? "selected" : ""}`}
              aria-pressed={state.pathMode === "direct"}
              onClick={() => patch({ pathMode: "direct" })}
            >
              <span className="choice-radio" />
              <div>
                <strong>نعم، مهتم بمجال معين</strong>
                <p>اختر المسار لنراجع المهارات المتطابقة والناقصة.</p>
              </div>
            </button>
            <button
              className={`choice-card ${state.pathMode === "interest" ? "selected" : ""}`}
              aria-pressed={state.pathMode === "interest"}
              onClick={discover}
            >
              <span className="choice-radio" />
              <div>
                <strong>لا، أريد اكتشاف المجال المناسب</strong>
                <p>أكمل استبيان الاهتمامات أولًا، ثم قارن المسارات.</p>
              </div>
            </button>
          </div>
          {state.pathMode === "interest" && !ready && (
            <Notice icon="heart" className="mt24">
              أكمل الاستبيان لعرض النتائج. يجب الإجابة عن جميع الأسئلة، ويمكن
              اختيار «لا أفهم هذا النشاط» عند الحاجة.
              <div className="mt16">
                <Button small onClick={discover}>
                  متابعة الاستبيان
                </Button>
              </div>
            </Notice>
          )}
          {!state.pathMode && (
            <p className="small mt16">
              ستظهر المسارات بعد اختيار «نعم»، أو بعد إكمال الاستبيان عند اختيار
              «لا».
            </p>
          )}
        </section>
      )}
      {show && (
        <>
          <div className="careers-toolbar" ref={results}>
            <div className="row wrap">
              <h2>
                المسارات المهنية <span className="small muted">/ 07</span>
              </h2>
              {state.logged && (
                <Badge
                  color={
                    mode === "skills"
                      ? "blue"
                      : mode === "interest"
                        ? "purple"
                        : ""
                  }
                >
                  {mode === "skills"
                    ? "الترتيب حسب المهارات المؤكدة"
                    : mode === "interest"
                      ? "الترتيب حسب الاهتمامات"
                      : "دون ترتيب تطابق"}
                </Badge>
              )}
            </div>
            {state.logged && ready && (
              <Button small variant="ghost" icon="edit" onClick={discover}>
                تعديل إجابات الاستبيان
              </Button>
            )}
          </div>
          {state.logged && (
            <Notice tone="neutral" className="mb24">
              {mode === "skills"
                ? "لديك مهارات مؤكدة؛ لذلك تُرتب المسارات بحسب تطابق المهارات، حتى بعد إكمال الاستبيان."
                : mode === "interest"
                  ? "لا توجد مهارات مؤكدة؛ لذلك تُرتب المسارات بحسب إجابات الاهتمامات."
                  : "لا توجد مهارات مؤكدة أو إجابات اهتمامات قابلة للحساب؛ اختر مسارًا مباشرة."}{" "}
              النسبتان مستقلتان ولا تُجمعان. ويمكنك اختيار أي مسار.
            </Notice>
          )}
          <div className="career-grid">
            {(state.logged ? rankCareers(state) : careerPaths).map(
              (career, index) => (
                <CareerCard
                  key={career.id}
                  career={career}
                  state={state}
                  mode={mode}
                  top={index === 0}
                />
              ),
            )}
          </div>
          <p className="small mt24">
            متطلبات المسارات في النموذج أمثلة لتقييم التجربة، وليست توصيفًا
            معتمدًا لمتطلبات سوق العمل.
          </p>
        </>
      )}
    </div>
  );
}
