import {
  careerPaths,
  getCareer,
} from "../../careers/services/careerCatalog.js";

export const courseId = (skill) =>
  skill === "Python"
    ? "python-basics"
    : skill
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
export function projectPrompt(id) {
  return {
    web: "ابنِ تطبيق مهام بواجهة متجاوبة، وحفظ للبيانات، وتكامل مع واجهة API.",
    "data-science":
      "حلّل مجموعة بيانات عامة، ونظّفها، واعرض الرسوم والاستنتاجات، وجرّب نموذج تنبؤ بسيط.",
    database:
      "صمّم قاعدة بيانات لنظام مواعيد، واكتب استعلامات واختبر أثر الفهارس.",
    devops:
      "جهّز تطبيقًا داخل Docker، وأنشئ مسار CI/CD تجريبيًا مع مراقبة التشغيل.",
    security: "أنشئ مختبر شبكة محليًا وحدد قواعد حماية وسجّل ملاحظات المراقبة.",
    "data-engineering":
      "ابنِ خط ETL يجمع بيانات عامة وينظّفها ويخزنها في قاعدة بيانات.",
    blockchain:
      "اكتب عقدًا ذكيًا بسيطًا واختبره على شبكة محلية مع حالات نجاح وفشل.",
  }[id];
}
export function roadmapStages(state) {
  const path = getCareer(state.path);
  if (!path || !state.started) return [];
  const needed = state.confirmed.length
    ? path.skills.filter((skill) => !state.confirmed.includes(skill))
    : path.skills;
  const groups = [needed.slice(0, 2), needed.slice(2, 4), needed.slice(4)];
  const titles = ["ابنِ أساسك", "وسّع مهاراتك", "اربط التعلم بالتطبيق"];
  const stages = groups
    .map((skills, index) => ({
      title: titles[index],
      lessons: skills.map((skill) => ({
        id: `concept:${skill}`,
        courseId: courseId(skill),
        title: skill,
        skills: [skill],
        type: "concept",
        description: `تعرّف على مفاهيم ${skill}، ثم نفّذ تمارين صغيرة للتأكد من فهمها.`,
      })),
    }))
    .filter((stage) => stage.lessons.length);
  stages.push({
    title: "طبّق ما تعلمته",
    lessons: [
      {
        id: `project:${path.id}`,
        title: `مشروع تطبيقي في ${path.name}`,
        description: projectPrompt(path.id),
        skills: path.skills,
        type: "project",
      },
    ],
  });
  return stages;
}
export function roadmapProgress(state) {
  const lessons = roadmapStages(state).flatMap((stage) => stage.lessons);
  const done = lessons.filter((lesson) => state.completed[lesson.id]).length;
  return {
    total: lessons.length,
    done,
    percent: lessons.length ? Math.round((done / lessons.length) * 100) : 0,
  };
}
export function prerequisite(id, state) {
  const lessons = roadmapStages(state).flatMap((stage) => stage.lessons);
  const index = lessons.findIndex((lesson) => lesson.id === id);
  return lessons
    .slice(0, Math.max(index, 0))
    .find((lesson) => !state.completed[lesson.id]);
}
export function nextLesson(state) {
  return roadmapStages(state)
    .flatMap((stage) => stage.lessons)
    .find((lesson) => !state.completed[lesson.id]);
}
export function getCourse(id) {
  for (const path of careerPaths) {
    const skill = path.skills.find((skill) => courseId(skill) === id);
    if (skill) return { id, skill, lessonId: `concept:${skill}`, path };
  }
  return null;
}
export function activityRoute(lesson) {
  return lesson.type === "project"
    ? `/projects?activity=${encodeURIComponent(lesson.id)}`
    : `/courses/${lesson.courseId}`;
}
