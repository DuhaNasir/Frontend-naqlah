import { App, Form, Input, Select } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../shared/components/Button.jsx";
import Badge from "../../shared/components/Badge.jsx";
import Icon from "../../shared/components/Icon.jsx";
import {
  initialState,
  useNaqlah,
} from "../../shared/context/NaqlahContext.jsx";

export default function AuthPage() {
  const [params] = useSearchParams();
  const signup = params.get("mode") !== "login";
  const [form] = Form.useForm();
  const { state, patch, setState, resetDemo } = useNaqlah();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const submit = (values) => {
    if (signup) {
      setState({
        ...initialState(),
        logged: true,
        name: values.name.trim(),
        email: values.email.trim(),
        major: values.major,
      });
      navigate("/onboarding/cv");
    } else {
      if (!state.name) resetDemo("returning");
      patch({ logged: true, email: values.email.trim() });
      navigate("/dashboard");
    }
  };
  return (
    <div className="auth-page">
      <section className="auth-form">
        <div className="auth-tabs" role="tablist" aria-label="نوع الدخول">
          <button
            role="tab"
            aria-selected={signup}
            className={signup ? "active" : ""}
            onClick={() => {
              form.resetFields();
              navigate("/auth");
            }}
          >
            إنشاء حساب
          </button>
          <button
            role="tab"
            aria-selected={!signup}
            className={!signup ? "active" : ""}
            onClick={() => {
              form.resetFields();
              navigate("/auth?mode=login");
            }}
          >
            تسجيل الدخول
          </button>
        </div>
        <div className="eyebrow">
          {signup ? "أول خطوة في رحلتك" : "مساحتك تنتظرك"}
        </div>
        <h1>{signup ? "مستقبلك يبدأ بخطوة." : "أهلًا بعودتك إلى نَقلة."}</h1>
        <p className="small">
          {signup
            ? "أنشئ حسابك، ثم لنكتشف ما يمكنك البناء عليه."
            : "أكمل من حيث توقفت، وتابع خطواتك القادمة."}
        </p>
        <Form
          form={form}
          layout="vertical"
          onFinish={submit}
          requiredMark={false}
          className="mt24"
        >
          {signup && (
            <Form.Item
              name="name"
              label="الاسم"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "اكتب الاسم للمتابعة.",
                },
              ]}
            >
              <Input
                placeholder="كيف تحب أن نناديك؟"
                maxLength={60}
                autoComplete="given-name"
              />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="البريد الإلكتروني"
            rules={[
              {
                required: true,
                type: "email",
                message: "أدخل بريدًا إلكترونيًا صحيحًا.",
              },
            ]}
          >
            <Input
              dir="ltr"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Form.Item>
          {signup && (
            <Form.Item
              name="major"
              label="التخصص"
              rules={[{ required: true, message: "اختر تخصصك." }]}
            >
              <Select
                placeholder="اختر تخصصك"
                options={[
                  "علوم الحاسب",
                  "الذكاء الاصطناعي",
                  "هندسة البرمجيات",
                  "نظم المعلومات",
                ].map((value) => ({ value, label: value }))}
              />
            </Form.Item>
          )}
          <Form.Item
            name="password"
            label="كلمة المرور"
            rules={[
              { required: true, min: 8, message: "استخدم 8 أحرف على الأقل." },
            ]}
            extra="استخدم بيانات تجريبية. لا تُحفظ كلمة المرور في النموذج."
          >
            <Input.Password
              placeholder="8 أحرف على الأقل"
              autoComplete={signup ? "new-password" : "current-password"}
            />
          </Form.Item>
          <Button htmlType="submit" className="full">
            {signup ? "إنشاء الحساب والمتابعة" : "الدخول إلى لوحة التحكم"}
          </Button>
          <p className="auth-note">
            {signup
              ? "الخطوة التالية: رفع سيرتك ومراجعة مهاراتك."
              : "تُحفظ خطوات التجربة في هذا المتصفح."}
          </p>
        </Form>
        <div className="divider" style={{ margin: "22px 0 16px" }} />
        <Button
          variant="ghost"
          className="full"
          small
          icon="spark"
          onClick={() => {
            if (signup) {
              form.setFieldsValue({
                name: "ضحى",
                email: "duha@example.com",
                major: "علوم الحاسب",
                password: "NaqlahDemo26",
              });
              message.info("بيانات تجريبية جاهزة. اضغط إنشاء الحساب للمتابعة.");
            } else {
              resetDemo("returning");
              navigate("/dashboard");
            }
          }}
        >
          {signup ? "تعبئة بيانات للتجربة" : "تجربة حساب طالب عائد"}
        </Button>
      </section>
      <aside className="auth-art">
        <div className="art-top">
          <Badge color="blue" icon="spark">
            من هنا تبدأ نَقلتك
          </Badge>
          <h2>
            اعرف مهاراتك.
            <br />
            اختر مسارك.
            <br />
            <span className="blue">ارسم خطوتك القادمة.</span>
          </h2>
          <p>رحلة مهنية تبدأ مما تعرفه، وتتقدم مع كل شيء تتعلمه.</p>
        </div>
        <div className="art-canvas" aria-hidden="true">
          <svg className="orbit-line" viewBox="0 0 400 260">
            <path
              d="M320 40C100 0 350 140 135 130S80 220 305 225"
              fill="none"
              stroke="#aec8f6"
              strokeWidth="2"
              strokeDasharray="5 7"
            />
            <circle cx="215" cy="108" r="5" fill="#2563eb" />
            <circle cx="195" cy="198" r="5" fill="#0f766e" />
          </svg>
          {[
            ["a", "file", "", "مهاراتك، نقطة البداية", "CV + مراجعتك الشخصية"],
            ["b", "target", "purple", "مسار يناسبك", "اختيار أو استكشاف"],
            ["c", "route", "teal", "خطة تعرف بها ما يلي", "تعلم، طبّق، وتقدم"],
          ].map(([position, icon, color, title, description]) => (
            <div className={`float-card ${position}`} key={position}>
              <span className={`float-icon ${color}`}>
                <Icon name={icon} />
              </span>
              <div>
                {title}
                <p className="small">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="art-bottom">
          <span />
          مصممة لطلاب تخصصات الحاسب
        </div>
      </aside>
    </div>
  );
}
