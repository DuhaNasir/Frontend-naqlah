import { useState } from "react";
import { App, Modal, Tabs } from "antd";
import { useNaqlah } from "../../shared/context/NaqlahContext.jsx";
import PageHeader from "../../shared/components/PageHeader.jsx";
import Button from "../../shared/components/Button.jsx";
import Badge from "../../shared/components/Badge.jsx";
import Notice from "../../shared/components/Notice.jsx";
import EmptyState from "../../shared/components/EmptyState.jsx";
import Icon from "../../shared/components/Icon.jsx";
import SkillItem from "../../shared/components/skills/SkillItem.jsx";
import {
  activityRoute,
  roadmapStages,
} from "../roadmap/services/roadmapService.js";
import CourseRecordForm from "./components/CourseRecordForm.jsx";

export default function CoursesPage() {
  const { state, patch } = useNaqlah();
  const [adding, setAdding] = useState(false);
  const [tab, setTab] = useState("learning");
  const { message } = App.useApp();
  const lessons = roadmapStages(state)
    .flatMap((stage) => stage.lessons)
    .filter((lesson) => lesson.type === "concept");
  const save = (course) => {
    patch((previous) => ({
      courses: [...previous.courses, course],
      covered: [...new Set([...previous.covered, ...course.skills])],
    }));
    setAdding(false);
    setTab("academic");
    message.success("حُفظت مفاهيم المقرر منفصلة عن مهاراتك المؤكدة.");
  };
  const learning = (
    <>
      {state.started ? (
        <>
          <Notice tone="neutral" className="mb24">
            هذه أنشطة تعلم توضيحية؛ إكمالها لا يثبت الإتقان أو يؤكد مهارة
            تلقائيًا.
          </Notice>
          <div className="grid gap-5 md:grid-cols-2">
            {lessons.map((lesson) => (
              <article className="course-card" key={lesson.id}>
                <span
                  className={`float-icon ${state.completed[lesson.id] ? "teal" : ""}`}
                >
                  <Icon name={state.completed[lesson.id] ? "check" : "book"} />
                </span>
                <div className="flex-1">
                  <h3 className="ltr text-right">{lesson.title}</h3>
                  <p>مفاهيم، تمارين، وتطبيق مقترح.</p>
                  <div className="mt16">
                    <Button
                      to={activityRoute(lesson)}
                      variant="secondary"
                      small
                    >
                      {state.completed[lesson.id]
                        ? "مراجعة النشاط المكتمل"
                        : "عرض النشاط"}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!lessons.length && (
            <Notice icon="check" tone="neutral">
              لديك جميع المفاهيم المدرجة لهذا المسار. انتقل إلى المشروع التطبيقي
              في خارطة التعلم.
            </Notice>
          )}
        </>
      ) : (
        <EmptyState
          title="ستظهر أنشطة خطتك هنا"
          description="اختر مسارًا وابدأ خطة التعلم."
        >
          <Button to="/careers">اختيار مسار</Button>
        </EmptyState>
      )}
    </>
  );
  const academic = (
    <>
      <Notice icon="book" className="mb24">
        مفاهيم المقررات تظهر كـ«مهارات غطتها المقررات» وتبقى غير مؤكدة. سجّل
        المقرر نصيًا؛ لا يلزم رفع توصيف.
      </Notice>
      <div className="stack">
        {state.courses.length ? (
          state.courses.map((course, index) => (
            <article className="card" key={index}>
              <div className="spread">
                <h3>{course.name}</h3>
                <Badge>مقرر دراسي</Badge>
              </div>
              <p className="small mt8">{course.concepts}</p>
              <div className="chips mt16">
                {course.skills.map((skill) => (
                  <SkillItem key={skill} name={skill} status="covered" />
                ))}
              </div>
              <div className="mt16">
                <Button to="/projects" variant="secondary" small icon="plus">
                  أضف تطبيقًا عمليًا
                </Button>
              </div>
            </article>
          ))
        ) : (
          <EmptyState
            title="ما الذي درسته حتى الآن؟"
            description="أضف اسم المقرر والمفاهيم التي تعلمتها."
          >
            <Button onClick={() => setAdding(true)} icon="plus">
              إضافة أول مقرر
            </Button>
          </EmptyState>
        )}
      </div>
    </>
  );
  return (
    <>
      <PageHeader
        title="تعلّمك في مكان واحد."
        subtitle="تابع أنشطة خطتك، وسجّل المفاهيم التي غطتها مقرراتك."
        action={
          <Button onClick={() => setAdding(true)} icon="plus">
            إضافة مقرر دراسي
          </Button>
        }
      />
      <Tabs
        activeKey={tab}
        onChange={setTab}
        items={[
          { key: "learning", label: "أنشطة خطتي", children: learning },
          {
            key: "academic",
            label: `مقرراتي الدراسية${state.courses.length ? ` (${state.courses.length})` : ""}`,
            children: academic,
          },
        ]}
      />
      <Modal
        title="إضافة مقرر دراسي"
        open={adding}
        onCancel={() => setAdding(false)}
        footer={null}
        destroyOnHidden
      >
        <CourseRecordForm onSave={save} />
      </Modal>
    </>
  );
}
