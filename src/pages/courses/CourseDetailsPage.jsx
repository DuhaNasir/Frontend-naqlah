import { App } from "antd";
import { useParams } from "react-router-dom";
import { useNaqlah } from "../../shared/context/NaqlahContext.jsx";
import {
  activityRoute,
  getCourse,
  prerequisite,
} from "../roadmap/services/roadmapService.js";
import { getCareer } from "../careers/services/careerCatalog.js";
import PageHeader from "../../shared/components/PageHeader.jsx";
import Button from "../../shared/components/Button.jsx";
import Badge from "../../shared/components/Badge.jsx";
import Notice from "../../shared/components/Notice.jsx";
import Icon from "../../shared/components/Icon.jsx";
import ErrorState from "../../shared/components/ErrorState.jsx";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const { state, patch } = useNaqlah();
  const { message } = App.useApp();
  const course = getCourse(id);
  if (!course) return <ErrorState title="الدورة غير موجودة." />;
  const completed = state.completed[course.lessonId];
  const previous = !completed && prerequisite(course.lessonId, state);
  const complete = () => {
    patch((prior) => ({
      completed: {
        ...prior.completed,
        [course.lessonId]: {
          title: course.skill,
          pathName: getCareer(prior.path)?.name || course.path.name,
          skills: [course.skill],
        },
      },
      covered: [...new Set([...prior.covered, course.skill])],
    }));
    message.success("حُفظ إنجازك. المهارة لم تُؤكد تلقائيًا.");
  };
  return (
    <>
      <PageHeader
        title={`تعلّم ${course.skill}`}
        subtitle="نشاط توضيحي من خارطة التعلم"
        action={
          <Button to="/roadmap" variant="secondary" icon="route">
            الرجوع للخطة
          </Button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] items-start">
        <section className="card">
          <div className="row">
            <span className="float-icon">
              <Icon name="book" size={24} />
            </span>
            <Badge color={completed ? "teal" : "blue"}>
              {completed ? "مكتمل ومحفوظ" : "مفاهيم + تمارين"}
            </Badge>
          </div>
          <h2 className="mt24">ما الذي ستركز عليه؟</h2>
          <p className="mt16">
            تعرّف على مفاهيم {course.skill}، ثم نفّذ تمارين صغيرة للتأكد من
            فهمها.
          </p>
          <div className="card soft mt24">
            <h3>جرّب تطبيقًا صغيرًا</h3>
            <p className="small mt8">
              استخدم {course.skill} في مثال بسيط، واشرح الخطوات التي نفذتها. بعد
              الانتهاء، أضف تطبيقك ضمن «الأعمال التطبيقية» مع المفاهيم التي
              استخدمتها.
            </p>
          </div>
          <Notice tone="neutral" className="mt24">
            إكمال التعلم يسجّل المفهوم ضمن ما درسته. تأكيد المهارة خطوة منفصلة
            بعد التطبيق والمراجعة.
          </Notice>
          {!state.started ? (
            <Notice className="mt24">
              اختر مسارك أولًا لتتابع هذا النشاط ضمن خطة.
              <div className="mt16">
                <Button to="/careers" small>
                  اختيار المسار
                </Button>
              </div>
            </Notice>
          ) : previous ? (
            <Notice icon="lock" className="mt24">
              أكمل {previous.title} أولًا، ثم عد إلى هذا النشاط.
              <div className="mt16">
                <Button to={activityRoute(previous)} small>
                  عرض الخطوة السابقة
                </Button>
              </div>
            </Notice>
          ) : (
            <div className="actions">
              <Button
                to={`/projects?course=${course.id}`}
                variant="secondary"
                icon="plus"
              >
                إضافة تطبيق عملي
              </Button>
              {completed ? (
                <Badge color="teal" icon="check">
                  مكتمل ومحفوظ
                </Badge>
              ) : (
                <Button onClick={complete} icon="check">
                  إكمال نشاط التعلم
                </Button>
              )}
            </div>
          )}
        </section>
        <aside className="card">
          <h3>بعد التعلم، جرّب.</h3>
          <p className="small mt16">
            صف ما طبّقته في مشروع أو لاب أو واجب. المهارات التي تراجعها وتؤكدها
            هي التي تؤثر على تطابق المسار.
          </p>
          <div className="mt24">
            <Button
              to={`/projects?course=${course.id}`}
              variant="light"
              icon="briefcase"
            >
              الذهاب للأعمال التطبيقية
            </Button>
          </div>
          <div className="divider" />
          <p className="small">
            محتوى النشاط هنا مثال لتقييم واجهات التعلم، وليس دورة مقدمة من جهة
            تدريبية.
          </p>
        </aside>
      </div>
    </>
  );
}
