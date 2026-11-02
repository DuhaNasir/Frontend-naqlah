import { Progress, Tooltip } from "antd";
import { useNaqlah } from "../../shared/context/NaqlahContext.jsx";
import PageHeader from "../../shared/components/PageHeader.jsx";
import Button from "../../shared/components/Button.jsx";
import Badge from "../../shared/components/Badge.jsx";
import Notice from "../../shared/components/Notice.jsx";
import EmptyState from "../../shared/components/EmptyState.jsx";
import Icon from "../../shared/components/Icon.jsx";
import { getCareer } from "../careers/services/careerCatalog.js";
import {
  activityRoute,
  prerequisite,
  roadmapProgress,
  roadmapStages,
} from "./services/roadmapService.js";

export default function RoadmapPage() {
  const { state } = useNaqlah();
  const career = getCareer(state.path);
  const stages = roadmapStages(state);
  if (!career || !state.started)
    return (
      <>
        <PageHeader
          title="خارطة التعلم"
          subtitle="خطوات واضحة تنطلق من اختيارك."
        />
        <EmptyState
          title="اختر مسارك أولًا"
          description="بعد اختيار المسار، ستظهر خطة تأسيسية أو مخصصة حسب مهاراتك المؤكدة."
        >
          <Button to="/careers">استكشاف المسارات</Button>
        </EmptyState>
      </>
    );
  const progress = roadmapProgress(state);
  return (
    <>
      <PageHeader
        title="خطوة بخطوة، نحو مسارك."
        subtitle={`${career.name} · ${state.confirmed.length ? "خطة مخصصة حسب المهارات المؤكدة" : "خطة تأسيسية"}`}
        action={
          <Button to="/careers" variant="secondary" icon="edit">
            تغيير المسار
          </Button>
        }
      />
      <div className="roadmap-layout">
        <section>
          <div className="roadmap-overview">
            <div className="spread mb24">
              <div>
                <h3>خارطة تعلمك</h3>
                <p className="small">خطة توضيحية لتجربة التسلسل والمتابعة.</p>
              </div>
              <Badge color="teal" icon="route">
                {state.confirmed.length ? "مخصصة" : "تأسيسية"}
              </Badge>
            </div>
            <div className="progress-info">
              <span>
                {progress.done} من {progress.total} أنشطة مكتملة
              </span>
              <span className="ltr teal">{progress.percent}%</span>
            </div>
            <Progress
              percent={progress.percent}
              showInfo={false}
              strokeColor="var(--teal)"
            />
          </div>
          {stages.map((stage, index) => (
            <section className="roadmap-step" key={stage.title}>
              <span
                className={`step-circle ${stage.lessons.every((lesson) => state.completed[lesson.id]) ? "complete" : ""}`}
              >
                {stage.lessons.every((lesson) => state.completed[lesson.id]) ? (
                  <Icon name="check" size={17} />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
              <div className="stage-title">
                <h3>{stage.title}</h3>
                <Badge>
                  {stage.lessons.length}{" "}
                  {stage.lessons.length === 1 ? "نشاط" : "أنشطة"}
                </Badge>
              </div>
              {stage.lessons.map((lesson) => {
                const completed = state.completed[lesson.id];
                const previous = prerequisite(lesson.id, state);
                return (
                  <article
                    className={`lesson ${completed ? "completed" : ""}`}
                    key={lesson.id}
                  >
                    <div className="row">
                      <span
                        className={`float-icon ${lesson.type === "project" ? "purple" : completed ? "teal" : ""}`}
                      >
                        <Icon
                          name={
                            completed
                              ? "check"
                              : lesson.type === "project"
                                ? "briefcase"
                                : "book"
                          }
                          size={18}
                        />
                      </span>
                      <div>
                        <h3
                          className={
                            lesson.type === "concept" ? "ltr text-right" : ""
                          }
                        >
                          {lesson.title}
                        </h3>
                        <p>{lesson.description}</p>
                      </div>
                    </div>
                    <div className="lesson-bottom">
                      <span className="lesson-meta">
                        <Icon
                          name={lesson.type === "project" ? "code" : "layers"}
                          size={14}
                        />
                        {lesson.type === "project"
                          ? "عمل عملي · يضاف في قسم الأعمال"
                          : "مفاهيم + تمارين + اقتراح تطبيق"}
                      </span>
                      {completed ? (
                        <Badge color="teal" icon="check">
                          مكتمل ومحفوظ
                        </Badge>
                      ) : previous && lesson.type === "project" ? (
                        <Tooltip title={`أكمل ${previous.title} أولًا`}>
                          <span>
                            <Button
                              small
                              variant="secondary"
                              disabled
                              icon="lock"
                            >
                              يتطلب إكمال السابق
                            </Button>
                          </span>
                        </Tooltip>
                      ) : (
                        <Button
                          to={activityRoute(lesson)}
                          small
                          variant="secondary"
                          icon={previous ? "lock" : "arrow"}
                        >
                          {lesson.type === "project"
                            ? "إضافة عملي التطبيقي"
                            : "عرض النشاط"}
                        </Button>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          ))}
        </section>
        <aside className="roadmap-aside">
          <section className="card">
            <h3>ما الذي يجعل الخطة لك؟</h3>
            <ul className="check-list">
              {[
                "مهاراتك المؤكدة نقطة البداية.",
                "المفاهيم أولًا، ثم تطبيقها.",
                "كل إنجاز يبقى محفوظًا عند تغيير المسار.",
              ].map((text) => (
                <li key={text}>
                  <Icon name="check" size={16} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="card">
            <div className="section-heading">
              <h3>سجل الإنجاز</h3>
              <Badge color="teal">{Object.keys(state.completed).length}</Badge>
            </div>
            {Object.values(state.completed).length ? (
              Object.values(state.completed).map((lesson, index) => (
                <div className="completed-log" key={index}>
                  <Icon name="check" size={13} /> {lesson.title}
                  <p className="text-xs mt-1">{lesson.pathName}</p>
                </div>
              ))
            ) : (
              <p>أكمل أول نشاط، وشاهد تقدمك هنا.</p>
            )}
          </section>
          <Notice tone="neutral">
            إكمال نشاط تعلم لا يؤكد المهارة تلقائيًا. راجعها بعد تطبيقها عمليًا.
          </Notice>
        </aside>
      </div>
    </>
  );
}
