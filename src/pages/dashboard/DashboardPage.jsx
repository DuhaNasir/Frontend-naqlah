import { Progress } from "antd";
import { Link } from "react-router-dom";
import { useNaqlah } from "../../shared/context/NaqlahContext.jsx";
import PageHeader from "../../shared/components/PageHeader.jsx";
import Button from "../../shared/components/Button.jsx";
import Icon from "../../shared/components/Icon.jsx";
import Badge from "../../shared/components/Badge.jsx";
import Notice from "../../shared/components/Notice.jsx";
import SkillItem from "../../shared/components/skills/SkillItem.jsx";
import MatchIndicator from "../../shared/components/skills/MatchIndicator.jsx";
import { getCareer } from "../careers/services/careerCatalog.js";
import {
  interestMatch,
  skillMatch,
} from "../careers/services/careerMatching.js";
import {
  activityRoute,
  nextLesson,
  roadmapProgress,
} from "../roadmap/services/roadmapService.js";

export default function DashboardPage() {
  const { state } = useNaqlah();
  const career = getCareer(state.path);
  const progress = roadmapProgress(state);
  const next = nextLesson(state);
  const completed = Object.values(state.completed);
  return (
    <>
      <PageHeader
        title={`أهلًا ${state.name?.split(" ")[0] || "طالبنا"}، خطوتك التالية هنا.`}
        subtitle={
          career
            ? "كل ما أنجزته، وما ينتظرك، في مكان واحد."
            : "ابدأ بمهاراتك، ثم اختر المسار الذي تريد استكشافه."
        }
        action={
          <Badge color="teal" icon="spark">
            مساحتك الشخصية
          </Badge>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 dashboard-metrics">
        {[
          [
            "المهارات المؤكدة",
            String(state.confirmed.length).padStart(2, "0"),
            "بعد مراجعتك وتأكيدك",
            "check",
            "teal",
          ],
          [
            "تقدم الخطة",
            `${progress.percent}%`,
            `${progress.done} من ${progress.total} أنشطة مكتملة`,
            "route",
            "blue",
          ],
          [
            "سجل الإنجاز",
            String(completed.length).padStart(2, "0"),
            "أنشطة محفوظة عبر مساراتك",
            "book",
            "purple",
          ],
        ].map(([label, value, caption, icon, color]) => (
          <section className="card metric-card" key={label}>
            <div className="spread">
              <span className="small muted">{label}</span>
              <span className={`metric-icon ${color}`}>
                <Icon name={icon} size={19} />
              </span>
            </div>
            <div className={`metric ${color}`}>{value}</div>
            <p>{caption}</p>
          </section>
        ))}
      </div>
      <div className="dashboard-main">
        <div>
          <section className="path-banner">
            <Badge color="white" icon={career?.icon || "route"}>
              {career ? "مسارك الحالي" : "رحلتك تبدأ هنا"}
            </Badge>
            <h2>{career?.name || "لنكتشف مسارك التقني."}</h2>
            <p>
              {career
                ? "خطتك تتطور مع مهاراتك، وإنجازك يبقى معك."
                : "أضف مهاراتك واختر مسارًا لبناء خطة واضحة."}
            </p>
            <Button
              to={career ? "/roadmap" : "/onboarding/cv"}
              variant="secondary"
            >
              {career ? "متابعة خارطة التعلم" : "بدء ملف المهارات"}
            </Button>
          </section>
          <section className="card mt24">
            <div className="section-heading">
              <h2>خطوتك القادمة</h2>
              {career && (
                <Button to="/roadmap" variant="ghost" small icon="chevron">
                  الخطة كاملة
                </Button>
              )}
            </div>
            <div className="next-step">
              <span
                className={`float-icon ${next?.type === "project" ? "purple" : ""}`}
              >
                <Icon
                  name={next?.type === "project" ? "briefcase" : "book"}
                  size={23}
                />
              </span>
              <div>
                <h3>
                  {next?.title ||
                    (career
                      ? "أتممت أنشطة خطتك الحالية"
                      : "أضف مهاراتك التقنية")}
                </h3>
                <p>
                  {next
                    ? "ابدأ نشاطًا صغيرًا، وابنِ عليه."
                    : career
                      ? "راجع مهاراتك أو استكشف مسارًا آخر."
                      : "ارفع CV أو أضف مهاراتك يدويًا."}
                </p>
              </div>
              <Button
                to={
                  next
                    ? activityRoute(next)
                    : career
                      ? "/profile"
                      : "/onboarding/cv"
                }
                variant="ghost"
                small
              >
                {next ? "متابعة" : career ? "مراجعة الملف" : "ابدأ الآن"}
              </Button>
            </div>
            <div className="progress-info mt24">
              <span>تقدم الخطة الحالية</span>
              <span className="ltr">{progress.percent}%</span>
            </div>
            <Progress
              percent={progress.percent}
              showInfo={false}
              strokeColor="var(--teal)"
            />
          </section>
          <div className="quick-links">
            <Link className="quick-link" to="/projects">
              <span className="float-icon">
                <Icon name="briefcase" size={19} />
              </span>
              إضافة عمل تطبيقي
              <Icon name="chevron" size={16} />
            </Link>
            <Link className="quick-link" to="/profile">
              <span className="float-icon teal">
                <Icon name="user" size={19} />
              </span>
              مراجعة ملف المهارات
              <Icon name="chevron" size={16} />
            </Link>
          </div>
        </div>
        <div className="stack">
          <section className="card">
            <div className="section-heading">
              <h2>مهاراتك ومسارك</h2>
              <Button to="/profile" variant="ghost" small icon="chevron">
                الملف
              </Button>
            </div>
            {career && state.confirmed.length ? (
              <div className="match-card">
                <Progress
                  type="circle"
                  percent={skillMatch(career, state.confirmed)}
                  size={86}
                  strokeColor="var(--blue)"
                />
                <div>
                  <span className="match-label">تطابق المهارات</span>
                  <p className="small mt8">
                    {
                      career.skills.filter((skill) =>
                        state.confirmed.includes(skill),
                      ).length
                    }{" "}
                    من {career.skills.length} في المسار الحالي
                  </p>
                </div>
              </div>
            ) : (
              <Notice tone="neutral">
                {career
                  ? "خطتك تأسيسية، لعدم وجود مهارات مؤكدة."
                  : "اختر مسارًا لعرض معلومات التطابق."}
              </Notice>
            )}
            <div className="chips mt24">
              {state.confirmed.length ? (
                state.confirmed
                  .slice(0, 5)
                  .map((skill) => <SkillItem key={skill} name={skill} />)
              ) : (
                <p className="small">لم تؤكد مهارات بعد.</p>
              )}
            </div>
            {career && interestMatch(career, state) !== null && (
              <div className="mt24">
                <MatchIndicator
                  kind="interest"
                  value={interestMatch(career, state)}
                />
              </div>
            )}
          </section>
          <section className="card">
            <div className="section-heading">
              <h3>آخر خطواتك</h3>
              <Icon name="clock" size={18} />
            </div>
            {completed.length ? (
              completed
                .slice(-3)
                .reverse()
                .map((lesson, index) => (
                  <div key={index} className="activity-row">
                    <span className="activity-dot" />
                    <div>
                      أكملت {lesson.title}
                      <p>محفوظ في سجل إنجازك</p>
                    </div>
                  </div>
                ))
            ) : (
              <div className="activity-row">
                <span className="activity-dot" />
                <div>
                  {career ? `اخترت ${career.name}` : "أنشأت مساحتك في نقلة"}
                  <p>جاهز لخطوة جديدة</p>
                </div>
              </div>
            )}
            {state.confirmed.length > 0 && (
              <div className="activity-row">
                <span className="activity-dot" />
                <div>
                  أكدت {state.confirmed.length} مهارات تقنية
                  <p>تنعكس على تطابق المهارات وخطتك</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
