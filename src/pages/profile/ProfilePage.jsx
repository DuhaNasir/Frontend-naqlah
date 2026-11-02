import { App, Avatar, Form, Input, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { useNaqlah } from "../../shared/context/NaqlahContext.jsx";
import { useProfileAvatar } from "../../shared/context/ProfileAvatarContext.jsx";
import PageHeader from "../../shared/components/PageHeader.jsx";
import Button from "../../shared/components/Button.jsx";
import Badge from "../../shared/components/Badge.jsx";
import Notice from "../../shared/components/Notice.jsx";
import SkillExtractionPanel from "../../shared/components/skills/SkillExtractionPanel.jsx";
import { getCareer } from "../careers/services/careerCatalog.js";
import { mergeCandidates } from "../auth/services/demoExtraction.js";

export default function ProfilePage() {
  const { state, patch } = useNaqlah();
  const { name, avatar, setAvatar, removeAvatar, setName } = useProfileAvatar();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const edit = () => {
    patch({
      candidates: mergeCandidates(
        state.candidates,
        state.confirmed.map((name) => ({ name, source: "مؤكدة سابقًا" })),
      ),
      review: [...state.confirmed],
    });
    navigate("/onboarding/skills");
  };
  const beforeAvatar = (file) => {
    if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
      message.error("اختر صورة أصغر من 2 MB لهذه التجربة.");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
      message.success("حُفظت الصورة محليًا في هذا المتصفح.");
    };
    reader.readAsDataURL(file);
    return false;
  };
  return (
    <>
      <PageHeader
        title="ملفك، كما تعرفه أنت."
        subtitle="راجع مهاراتك ومصادرها، وحدّثها مع كل تجربة جديدة."
        action={
          <Button onClick={edit} variant="secondary" icon="edit">
            تحديث المهارات
          </Button>
        }
      />
      <div className="profile-grid">
        <div className="stack">
          <section className="card">
            <div className="profile-head">
              <Avatar
                src={avatar || undefined}
                size={68}
                shape="square"
                style={{
                  borderRadius: 18,
                  background: "#dbeafe",
                  color: "var(--blue)",
                  fontSize: 27,
                }}
              >
                {name?.[0] || "ن"}
              </Avatar>
              <div>
                <h2>{name || "طالب نقلة"}</h2>
                <p>{state.major || "تخصص حاسب"}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              <Upload
                beforeUpload={beforeAvatar}
                showUploadList={false}
                accept="image/*"
              >
                <Button variant="secondary" small icon="upload">
                  تغيير الصورة
                </Button>
              </Upload>
              {avatar && (
                <Button
                  variant="ghost"
                  small
                  icon={false}
                  onClick={removeAvatar}
                >
                  إزالة الصورة
                </Button>
              )}
            </div>
            <div className="divider" />
            <Form
              layout="vertical"
              initialValues={{ name }}
              onFinish={(values) => {
                setName(values.name.trim());
                message.success("حُفظ الاسم.");
              }}
              requiredMark={false}
            >
              <Form.Item
                name="name"
                label="الاسم"
                rules={[
                  { required: true, whitespace: true, message: "اكتب الاسم." },
                ]}
              >
                <Input maxLength={60} />
              </Form.Item>
              <Button htmlType="submit" small variant="secondary" icon="check">
                حفظ الاسم
              </Button>
            </Form>
            <div className="divider" />
            <p className="small">البريد الإلكتروني</p>
            <p className="ltr mt8 text-right text-sm break-all">
              {state.email}
            </p>
            <div className="divider" />
            <h3>السيرة الذاتية</h3>
            <p className="small mt8" dir="auto">
              {state.cv || "لم تُضف سيرة ذاتية بعد"}
            </p>
            <div className="mt16">
              <Button
                to="/onboarding/cv"
                small
                variant="secondary"
                icon="upload"
              >
                {state.cv ? "تغيير السيرة" : "رفع سيرة ذاتية"}
              </Button>
            </div>
          </section>
          <section className="card">
            <h3>مسارك الحالي</h3>
            <p className="small mt8">
              {getCareer(state.path)?.name || "لم تختر مسارًا بعد"}
            </p>
            <div className="mt16">
              <Button to="/careers" small variant="secondary">
                استكشاف المسارات
              </Button>
            </div>
          </section>
        </div>
        <div className="stack">
          <section className="card">
            <div className="section-heading">
              <h2>المهارات المؤكدة</h2>
              <Badge color="teal" icon="check">
                {state.confirmed.length}
              </Badge>
            </div>
            <p className="small mb24">
              راجعتها وأكدتها بنفسك؛ تدخل في حساب التطابق والفجوة.
            </p>
            <SkillExtractionPanel
              skills={state.confirmed}
              status="confirmed"
              empty="لا توجد مهارات مؤكدة حتى الآن."
            />
            <div className="mt24">
              <Button onClick={edit} variant="light" small icon="plus">
                مراجعة وإضافة مهارات
              </Button>
            </div>
          </section>
          <section className="card">
            <div className="section-heading">
              <h3>مهارات غطتها المقررات</h3>
              <Badge>{state.covered.length}</Badge>
            </div>
            <p className="small mb24">
              سجل للتعلم، منفصل عن المهارات المؤكدة ولا يؤثر على تطابقها.
            </p>
            <SkillExtractionPanel
              skills={state.covered}
              status="covered"
              empty="لم تسجل مفاهيم مقررات بعد."
            />
            <div className="mt24">
              <Button to="/courses" variant="secondary" small icon="book">
                إدارة المقررات
              </Button>
            </div>
          </section>
          <Notice icon="briefcase">
            هل طبّقت ما تعلمته؟
            <div className="mt16">
              <Button to="/projects" variant="secondary" small icon="plus">
                سجّل مشروعًا أو لابًا أو واجبًا عمليًا
              </Button>
            </div>
          </Notice>
        </div>
      </div>
    </>
  );
}
