import { App, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import OnboardingFrame from "./OnboardingFrame.jsx";
import Button from "../../../shared/components/Button.jsx";
import Badge from "../../../shared/components/Badge.jsx";
import Notice from "../../../shared/components/Notice.jsx";
import Icon from "../../../shared/components/Icon.jsx";
import SkillExtractionPanel from "../../../shared/components/skills/SkillExtractionPanel.jsx";
import { useNaqlah } from "../../../shared/context/NaqlahContext.jsx";
import { canonicalSkill } from "../services/demoExtraction.js";

export default function SkillReviewStep() {
  const { state, patch } = useNaqlah();
  const { message, modal } = App.useApp();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const confirm = () => {
    patch({
      confirmed: [...new Set(state.review)],
      ...(state.onboarding ? { pathMode: "" } : {}),
    });
    navigate(state.onboarding ? "/careers" : "/profile");
    message.success("تم حفظ مهاراتك المؤكدة، مع الاحتفاظ بسجل إنجازك.");
  };
  const submit = () => {
    if (!state.review.length && state.confirmed.length)
      modal.confirm({
        title: "المتابعة دون مهارات مؤكدة؟",
        content:
          "ستصبح الخطة تأسيسية دون حساب تطابق المهارات. يبقى سجل الأنشطة المكتملة محفوظًا.",
        okText: "تأكيد التغيير",
        cancelText: "الرجوع للمراجعة",
        onOk: confirm,
      });
    else confirm();
  };
  const addSkill = ({ skill }) => {
    const name = canonicalSkill(skill);
    if (
      state.candidates.some(
        (item) => item.name.toLowerCase() === name.toLowerCase(),
      )
    )
      return message.info("المهارة موجودة بالفعل ضمن المراجعة.");
    patch({
      candidates: [...state.candidates, { name, source: "أضفتها يدويًا" }],
      review: [...state.review, name],
    });
    form.resetFields();
  };
  return (
    <OnboardingFrame
      step={3}
      title="أنت أدرى بمهاراتك."
      subtitle="راجع المهارات المرشحة وحدد ما تؤكده، وأضف أي مهارة لم تظهر."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_290px] items-start">
        <section className="card">
          <div className="spread">
            <div>
              <h2>مراجعة المهارات</h2>
              <p className="small mt8">
                {state.cv ? `المصدر: ${state.cv}` : "إضافة مهاراتك يدويًا"}
              </p>
            </div>
            <Badge icon="edit">مرشحة للمراجعة</Badge>
          </div>
          <div className="skill-toolbar">
            <p className="small">حدد فقط المهارات التي طبّقتها وتعرفها.</p>
            <button
              className="text-link"
              onClick={() =>
                patch({
                  review:
                    state.review.length === state.candidates.length
                      ? []
                      : state.candidates.map((skill) => skill.name),
                })
              }
            >
              {state.review.length === state.candidates.length &&
              state.review.length
                ? "إلغاء تحديد الكل"
                : "تحديد الكل"}
            </button>
          </div>
          <SkillExtractionPanel
            skills={state.candidates}
            selected={state.review}
            onChange={(name, checked) =>
              patch((previous) => ({
                review: checked
                  ? [...new Set([...previous.review, name])]
                  : previous.review.filter((skill) => skill !== name),
              }))
            }
            empty="ابدأ بمهارة واحدة، مثل JavaScript أو SQL. ويمكنك الاستمرار دون مهارات أيضًا."
          />
          <Form
            form={form}
            onFinish={addSkill}
            className="add-skill"
            layout="inline"
          >
            <Form.Item
              name="skill"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "اكتب اسم مهارة.",
                },
              ]}
              style={{ flex: 1, margin: 0 }}
            >
              <Input
                placeholder="أضف مهارة تقنية، مثل Git"
                aria-label="اسم المهارة"
                maxLength={60}
              />
            </Form.Item>
            <Button htmlType="submit" variant="secondary" icon="plus">
              إضافة
            </Button>
          </Form>
          <Notice tone="neutral" className="mt24">
            إضافة المهارة تضعها ضمن المراجعة. لا تدخل في حساب التطابق إلا بعد
            التأكيد.
          </Notice>
          <div className="actions">
            <Button
              to={state.onboarding ? "/onboarding/cv" : "/profile"}
              variant="ghost"
              icon={false}
            >
              رجوع
            </Button>
            <Button onClick={submit}>
              {state.review.length ? "تأكيد والمتابعة" : "المتابعة دون مهارات"}
            </Button>
          </div>
        </section>
        <aside className="card summary-box">
          <h3>ملفك يبدأ من هنا</h3>
          <div className="big-number">{state.review.length}</div>
          <p className="small">مهارات محددة للتأكيد</p>
          <div className="divider" />
          <div className="row small teal">
            <Icon name="check" size={17} />
            المؤكدة تدخل في تطابق المهارات
          </div>
          <p className="small mt16">
            المهارات التي غطتها مقرراتك تبقى منفصلة، ولا تتحول تلقائيًا إلى
            مهارات مؤكدة.
          </p>
          <Notice icon="route" className="mt24">
            حتى دون مهارات مؤكدة، يمكنك اختيار مسار والحصول على خطة تأسيسية.
          </Notice>
        </aside>
      </div>
    </OnboardingFrame>
  );
}
