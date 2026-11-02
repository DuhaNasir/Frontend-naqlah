import { App, Progress } from "antd";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getCareer } from "./services/careerCatalog.js";
import {
  interestMatch,
  questionnaireReady,
  skillGap,
  skillMatch,
} from "./services/careerMatching.js";
import { useNaqlah } from "../../shared/context/NaqlahContext.jsx";
import Button from "../../shared/components/Button.jsx";
import Badge from "../../shared/components/Badge.jsx";
import Notice from "../../shared/components/Notice.jsx";
import Icon from "../../shared/components/Icon.jsx";
import Stepper from "../../shared/components/Stepper.jsx";
import SkillItem from "../../shared/components/skills/SkillItem.jsx";
import ErrorState from "../../shared/components/ErrorState.jsx";

export default function CareerDetailsPage() {
  const { id } = useParams();
  const { state, patch } = useNaqlah();
  const { modal, message } = App.useApp();
  const navigate = useNavigate();
  const career = getCareer(id === "software-engineering" ? "web" : id);
  if (!career) return <ErrorState title="المسار غير موجود." />;
  if (
    state.logged &&
    (!state.pathMode ||
      (state.pathMode === "interest" && !questionnaireReady(state)))
  )
    return <Navigate to="/careers" replace />;
  const gap = skillGap(career, state.confirmed);
  const interest = interestMatch(career, state);
  const commit = () => {
    patch({ path: career.id, started: true, onboarding: false });
    navigate("/roadmap");
    message.success("خطتك جاهزة للتجربة. إنجازك السابق محفوظ.");
  };
  const choose = () => {
    if (
      state.path &&
      state.path !== career.id &&
      Object.keys(state.completed).length
    )
      modal.confirm({
        title: "تغيير المسار، والاحتفاظ بإنجازك",
        content: `مسارك الجديد: ${career.name}. تبقى الأنشطة المكتملة في سجل إنجازك، وتتغير الأنشطة غير المكتملة حسب متطلبات المسار.`,
        okText: "اعتماد المسار الجديد",
        cancelText: "الرجوع",
        onOk: commit,
      });
    else commit();
  };
  return (
    <div className="public-container">
      {state.logged && state.onboarding && <Stepper step={4} />}
      <Link className="text-link mb24" to="/careers">
        <Icon name="chevron" size={15} />
        جميع المسارات
      </Link>
      <section className="detail-heading">
        <span className="float-icon">
          <Icon name={career.icon} size={32} />
        </span>
        <div>
          <span className="career-en">{career.en}</span>
          <h1>{career.name}</h1>
          <p>{career.desc}</p>
        </div>
      </section>
      <div className="grid gap-6 mt-6 lg:grid-cols-[1.5fr_1fr] items-start">
        <section className="card">
          <div className="spread">
            <h2>{gap ? "صورة مهاراتك لهذا المسار" : "ابدأ من الأساسيات"}</h2>
            <Badge color={gap ? "blue" : "teal"}>
              {gap ? "حسب مهاراتك المؤكدة" : "خطة تأسيسية"}
            </Badge>
          </div>
          {gap ? (
            <>
              <div className="match-card">
                <Progress
                  type="circle"
                  percent={skillMatch(career, state.confirmed)}
                  size={100}
                  strokeColor="var(--blue)"
                />
                <div>
                  <span className="match-label">تطابق المهارات</span>
                  <h3 className="mt8">
                    {gap.matched.length} من {career.skills.length} مهارات مطلوبة
                  </h3>
                  <p className="small mt8">يُحسب من المهارات المؤكدة فقط.</p>
                </div>
              </div>
              <div className="gap-section">
                <h3 className="teal">
                  <Icon name="check" size={17} />
                  المهارات المتطابقة{" "}
                  <Badge color="teal">{gap.matched.length}</Badge>
                </h3>
                {gap.matched.length ? (
                  <div className="chips">
                    {gap.matched.map((skill) => (
                      <SkillItem key={skill} name={skill} />
                    ))}
                  </div>
                ) : (
                  <p className="small">
                    لا توجد مهارات مؤكدة متطابقة لهذا المسار حتى الآن.
                  </p>
                )}
              </div>
              <div className="gap-section">
                <h3 className="amber">
                  <Icon name="target" size={17} />
                  مهارات ستبنيها{" "}
                  <Badge color="amber">{gap.missing.length}</Badge>
                </h3>
                {gap.missing.length ? (
                  <div className="chips">
                    {gap.missing.map((skill) => (
                      <SkillItem key={skill} name={skill} status="missing" />
                    ))}
                  </div>
                ) : (
                  <p className="small teal">
                    يمكنك التركيز على التطبيق العملي.
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="foundation">
                <div className="row teal">
                  <Icon name="route" size={22} />
                  <h3>لست بحاجة إلى خبرة لتبدأ</h3>
                </div>
                <p>
                  لم تؤكد مهارات بعد؛ لذلك لن نعرض نسبة تطابق أو نحسب فجوة
                  مهارات. ستبدأ بخطة تأسيسية لهذا المسار.
                </p>
                <Button
                  to={state.logged ? "/onboarding/skills" : "/auth"}
                  variant="secondary"
                  icon="plus"
                >
                  {state.logged ? "إضافة مهارات أولًا" : "إنشاء حساب"}
                </Button>
              </div>
              <h3 className="mt24">أمثلة على ما ستتعلمه</h3>
              <div className="chips mt16">
                {career.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </>
          )}
          {interest !== null && (
            <Notice icon="heart" className="mt24 interest-notice">
              <strong>
                تطابق الاهتمامات: <span className="ltr">{interest}%</span>
              </strong>
              <p className="small purple">
                مؤشر مستقل من إجاباتك، ولا يُجمع مع تطابق المهارات.
              </p>
            </Notice>
          )}
        </section>
        <aside className="card">
          <div className="eyebrow">خطوتك القادمة</div>
          <h2>{gap ? "خطة تنطلق من مهاراتك" : "خطة تبني الأساس"}</h2>
          <ul className="detail-points">
            <li>
              {gap
                ? "ركز على المهارات التي لم تؤكدها بعد."
                : "تدرج من المفاهيم الأساسية إلى التطبيق."}
            </li>
            <li>تعلّم بترتيب يراعي المتطلبات السابقة.</li>
            <li>طبّق ما تعلمته في عمل عملي.</li>
            <li>عند تغيير المسار، احتفظ بما أنجزته.</li>
          </ul>
          {state.logged ? (
            <Button onClick={choose} className="full">
              {state.path && state.path !== career.id
                ? "تغيير مساري إلى هذا المسار"
                : "اختيار المسار وعرض خطتي"}
            </Button>
          ) : (
            <Button to="/auth" className="full">
              ابدأ رحلتك
            </Button>
          )}
          <p className="small mt16">يمكنك الرجوع وتغيير اختيارك لاحقًا.</p>
        </aside>
      </div>
    </div>
  );
}
