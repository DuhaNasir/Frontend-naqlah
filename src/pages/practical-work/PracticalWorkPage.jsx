import { useEffect, useState } from "react";
import { App, Checkbox, Form, Input, Modal, Select } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useNaqlah } from "../../shared/context/NaqlahContext.jsx";
import { createWorkId } from "./services/workService.js";
import PageHeader from "../../shared/components/PageHeader.jsx";
import Button from "../../shared/components/Button.jsx";
import Notice from "../../shared/components/Notice.jsx";
import EmptyState from "../../shared/components/EmptyState.jsx";
import Badge from "../../shared/components/Badge.jsx";
import Icon from "../../shared/components/Icon.jsx";
import SkillItem from "../../shared/components/skills/SkillItem.jsx";
import SkillExtractionPanel from "../../shared/components/skills/SkillExtractionPanel.jsx";
import { getCareer } from "../careers/services/careerCatalog.js";
import {
  getCourse,
  prerequisite,
  projectPrompt,
} from "../roadmap/services/roadmapService.js";
import {
  mergeCandidates,
  prepareConcepts,
} from "../auth/services/demoExtraction.js";

export default function PracticalWorkPage() {
  const { state, patch } = useNaqlah();
  const [params, setParams] = useSearchParams();
  const [form] = Form.useForm();
  const [pending, setPending] = useState(null);
  const [selected, setSelected] = useState([]);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const career = getCareer(state.path);
  const activity = params.get("activity");
  const course = getCourse(params.get("course"));
  const linkedProject =
    !!career &&
    activity === `project:${career.id}` &&
    !prerequisite(activity, state);
  useEffect(() => {
    form.resetFields();
    if (activity && career)
      form.setFieldsValue({
        title: `مشروع تطبيقي في ${career.name}`,
        description: projectPrompt(career.id),
        linkActivity: true,
      });
    else if (course)
      form.setFieldsValue({
        title: `تطبيق على ${course.skill}`,
        course: course.skill,
      });
  }, [activity, course?.id, career?.id, form]);
  const save = (values) => {
    const skills = prepareConcepts(values.concepts);
    const work = {
      id: createWorkId(),
      title: values.title.trim(),
      type: values.type,
      description: values.description.trim(),
      concepts: values.concepts.trim(),
      course: values.course?.trim() || "",
      skills,
    };
    patch((previous) => ({
      works: [...previous.works, work],
      candidates: mergeCandidates(
        previous.candidates,
        skills.map((name) => ({ name, source: "عمل تطبيقي" })),
      ),
      completed:
        linkedProject && values.linkActivity
          ? {
              ...previous.completed,
              [activity]: { title: work.title, pathName: career.name, skills },
            }
          : previous.completed,
    }));
    setPending(work);
    setSelected([]);
    setParams({}, { replace: true });
    form.resetFields();
  };
  const confirm = () => {
    patch((previous) => ({
      confirmed: [...new Set([...previous.confirmed, ...selected])],
      review: [...new Set([...previous.confirmed, ...selected])],
    }));
    setPending(null);
    navigate("/profile");
    message.success("تم تحديث المهارات. تتكيف الخطة مع الحفاظ على إنجازك.");
  };
  return (
    <>
      <PageHeader
        title="حوّل ما تعلمته إلى دليل عملي."
        subtitle="سجّل مشروعًا أو لابًا أو واجبًا، ثم راجع المهارات التي طبقتها."
        action={
          <Button to="/profile" variant="secondary" icon="user">
            الملف الشخصي
          </Button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        <section className="card">
          <h2>إضافة عمل تطبيقي</h2>
          <p className="small mt8 mb24">الإدخال نصي في هذه النسخة.</p>
          <Form
            form={form}
            layout="vertical"
            onFinish={save}
            initialValues={{ type: "مشروع" }}
            requiredMark={false}
          >
            {linkedProject && (
              <Form.Item name="linkActivity" valuePropName="checked">
                <Checkbox>تسجيل هذا العمل كتطبيق لنشاط الخطة الحالي.</Checkbox>
              </Form.Item>
            )}
            <Form.Item
              name="title"
              label="عنوان العمل"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "اكتب عنوان العمل.",
                },
              ]}
            >
              <Input placeholder="مثل: تطبيق لإدارة المهام" maxLength={120} />
            </Form.Item>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <Form.Item name="type" label="نوع العمل">
                <Select
                  options={["مشروع", "لاب", "واجب"].map((value) => ({
                    value,
                    label: value,
                  }))}
                />
              </Form.Item>
              <Form.Item name="course" label="المقرر المرتبط (اختياري)">
                <Input placeholder="مثل: تطوير الويب" maxLength={120} />
              </Form.Item>
            </div>
            <Form.Item
              name="description"
              label="وصف ما نفذته"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "اكتب وصف ما نفذته.",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                maxLength={2000}
                placeholder="اشرح باختصار ما بنيته وما الذي نفذته بنفسك."
              />
            </Form.Item>
            <Form.Item
              name="concepts"
              label="المفاهيم والتقنيات التي طبقتها"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "اكتب المفاهيم والتقنيات.",
                },
              ]}
            >
              <Input
                placeholder="مثل: React, JavaScript, REST APIs"
                maxLength={500}
              />
            </Form.Item>
            <Button htmlType="submit" className="full">
              مراجعة مهارات العمل
            </Button>
          </Form>
        </section>
        <div className="stack">
          <section className="card">
            <h3>أعمالك المسجلة</h3>
            {state.works.length ? (
              state.works.map((work, index) => (
                <div className="activity-row" key={work.id || index}>
                  <span className="float-icon">
                    <Icon name="briefcase" size={18} />
                  </span>
                  <div>
                    <h3 className="text-base">{work.title}</h3>
                    <p>
                      {work.type}
                      {work.course && ` · ${work.course}`}
                    </p>
                    <div className="chips mt8">
                      {work.skills.map((skill) => (
                        <SkillItem
                          key={skill}
                          name={skill}
                          status={
                            state.confirmed.includes(skill)
                              ? "confirmed"
                              : "candidate"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt16">
                <EmptyState
                  title="لم تسجل أعمالًا بعد"
                  description="ابدأ بشيء صغير طبّقته بالفعل."
                />
              </div>
            )}
          </section>
          <Notice>
            مهارات العمل تظهر كمرشحة أولًا. راجعها وأكدها حتى تؤثر على ملفك
            وخطتك.
          </Notice>
        </div>
      </div>
      <Modal
        title="راجع مهارات عملك"
        open={!!pending}
        onCancel={() => setPending(null)}
        footer={null}
      >
        <p className="small mb24">
          نتائج توضيحية من المفاهيم المكتوبة؛ حدد ما طبّقته لتأكيده.
        </p>
        <SkillExtractionPanel
          skills={(pending?.skills || []).map((name) => ({
            name,
            source: `مرشحة · ${pending?.type || ""}`,
          }))}
          selected={selected}
          onChange={(name, checked) =>
            setSelected((previous) =>
              checked
                ? [...previous, name]
                : previous.filter((skill) => skill !== name),
            )
          }
        />
        <Notice tone="neutral" className="mt24">
          حُفظ العمل. المهارات المحددة وحدها ستُضاف إلى المهارات المؤكدة بعد
          المتابعة.
        </Notice>
        <div className="actions">
          <Button variant="ghost" icon={false} onClick={() => setPending(null)}>
            لاحقًا
          </Button>
          <Button icon="check" onClick={confirm}>
            تأكيد وتحديث الملف
          </Button>
        </div>
      </Modal>
    </>
  );
}
