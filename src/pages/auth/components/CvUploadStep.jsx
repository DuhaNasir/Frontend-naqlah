import { useState } from "react";
import { App, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import OnboardingFrame from "./OnboardingFrame.jsx";
import Button from "../../../shared/components/Button.jsx";
import Badge from "../../../shared/components/Badge.jsx";
import Notice from "../../../shared/components/Notice.jsx";
import Icon from "../../../shared/components/Icon.jsx";
import { useNaqlah } from "../../../shared/context/NaqlahContext.jsx";
import { mergeCandidates, sampleSkills } from "../services/demoExtraction.js";

export default function CvUploadStep() {
  const { state, patch } = useNaqlah();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const accept = (file) => {
    if (file.size > 25 * 1024 * 1024) {
      message.error("اختر ملفًا أصغر من 25 MB لتجربة الخطوة.");
      return Upload.LIST_IGNORE;
    }
    patch({ cv: file.name });
    message.info("تم اختيار الملف محليًا؛ لم يُرفع إلى خادم.");
    return false;
  };
  const review = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    patch({
      candidates: mergeCandidates(
        sampleSkills,
        state.confirmed.map((name) => ({ name, source: "مؤكدة سابقًا" })),
      ),
      review: [...state.confirmed],
    });
    navigate("/onboarding/skills");
  };
  return (
    <OnboardingFrame
      step={2}
      title="لنبدأ بما تعرفه بالفعل."
      subtitle="سيرتك الذاتية هي أسرع نقطة بداية لبناء ملف مهاراتك."
    >
      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] items-start">
        <section className="card">
          <div className="spread mb24">
            <h2>أضف سيرتك الذاتية</h2>
            <Badge color="blue">الطريقة المقترحة</Badge>
          </div>
          {state.cv ? (
            <div className="cv-file">
              <Icon name="file" size={30} />
              <div>
                <strong dir="auto">{state.cv}</strong>
                <p className="small">جاهزة لتجربة مراجعة المهارات</p>
              </div>
              <button
                className="icon-btn"
                style={{ marginInlineStart: "auto" }}
                onClick={() => patch({ cv: "" })}
                aria-label="إزالة السيرة"
              >
                <Icon name="close" size={16} />
              </button>
            </div>
          ) : (
            <Upload.Dragger
              beforeUpload={accept}
              showUploadList={false}
              multiple={false}
              className="cv-dragger"
            >
              <span className="upload-icon">
                <Icon name="upload" size={28} />
              </span>
              <h3>اسحب سيرتك هنا أو اختر ملفًا</h3>
              <p className="small mt8">
                ابدأ بنسخة تحتوي على مهاراتك التقنية وأعمالك.
              </p>
              <span className="btn primary mt16">
                اختيار سيرة ذاتية <Icon name="plus" size={16} />
              </span>
            </Upload.Dragger>
          )}
          <div className="spread mt16 wrap">
            <button
              className="text-link"
              onClick={() => patch({ cv: "سيرة تجريبية · Naqlah" })}
            >
              <Icon name="file" size={15} />
              استخدام سيرة تجريبية
            </button>
            <button
              className="text-link"
              onClick={() => {
                patch({
                  candidates: state.confirmed.map((name) => ({
                    name,
                    source: "مؤكدة سابقًا",
                  })),
                  review: [...state.confirmed],
                });
                navigate("/onboarding/skills");
              }}
            >
              لا أملك CV، سأضيف مهاراتي
            </button>
          </div>
          <Notice icon="lock" tone="neutral" className="mt24">
            هذا نموذج للتجربة: لا يُرفع الملف إلى خادم. نتائج الاستخراج في
            الخطوة التالية توضيحية.
          </Notice>
          <div className="actions">
            <Button
              to={state.onboarding ? "/auth" : "/profile"}
              variant="ghost"
              icon={false}
            >
              رجوع
            </Button>
            <Button onClick={review} disabled={!state.cv} loading={loading}>
              مراجعة المهارات
            </Button>
          </div>
        </section>
        <aside className="card">
          <span className="float-icon">
            <Icon name="spark" />
          </span>
          <h3 className="mt16">نبدأ بمهاراتك التقنية</h3>
          <p className="small mt8">سنراجع هذه الأجزاء من سيرتك:</p>
          <ul className="check-list">
            {[
              ["المهارات التقنية", "Technical Skills"],
              ["المشاريع", "Projects"],
              ["الخبرات", "Experience"],
            ].map(([label, english]) => (
              <li key={english}>
                <Icon name="check" size={17} />
                <div>
                  {label}
                  <small className="ltr">{english}</small>
                </div>
              </li>
            ))}
          </ul>
          <div className="divider" />
          <p className="small">
            يمكنك تعديل النتائج وإضافة ما فات قبل تأكيدها. السيرة الإنجليزية
            مناسبة أيضًا.
          </p>
        </aside>
      </div>
    </OnboardingFrame>
  );
}
