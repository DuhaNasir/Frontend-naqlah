import { useState } from "react";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon.jsx";
import Badge from "./Badge.jsx";
import Notice from "./Notice.jsx";
import { useNaqlah } from "../context/NaqlahContext.jsx";

const screens = [
  ["الرئيسية التعريفية", "/"],
  ["الحساب / تسجيل الدخول", "/auth"],
  ["إضافة CV", "/onboarding/cv"],
  ["مراجعة المهارات", "/onboarding/skills"],
  ["سؤال المجال ونتائج المسارات", "/careers"],
  ["الاستبيان — مطلوب عند اختيار لا", "/interests"],
  ["تفاصيل المسار والفجوة", "/careers/web"],
  ["خارطة التعلم", "/roadmap"],
  ["لوحة التحكم", "/dashboard"],
  ["المقررات والدورات", "/courses"],
  ["تفاصيل الدورة", "/courses/python-basics"],
  ["الملف الشخصي", "/profile"],
  ["الأعمال التطبيقية", "/projects"],
  ["الإعدادات", "/settings"],
];
export default function PrototypeTools() {
  const [open, setOpen] = useState(false);
  const { resetDemo } = useNaqlah();
  const navigate = useNavigate();
  const scenario = (type, path) => {
    resetDemo(type);
    setOpen(false);
    navigate(path);
  };
  return (
    <>
      <button className="eval-fab" onClick={() => setOpen(true)}>
        <Icon name="map" size={16} />
        خريطة التجربة <Badge color="blue">14 شاشة</Badge>
      </button>
      <Modal
        title="خريطة تجربة نَقلة"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={900}
      >
        <p className="text-sm mb-5">
          مساحة للفريق لتقييم الرحلة. تفاصيل الدورة والإعدادات الآن صفحات فعلية
          حسب الهيكل المطلوب.
        </p>
        <Notice icon="route">
          الحساب ← CV ← المراجعة ← سؤال المجال. «نعم» لاختيار المسار والفجوة.
          «لا» لاستبيان كامل ثم النتائج بمؤشرين منفصلين. الترتيب بالمهارات
          المؤكدة إن وجدت، وإلا بالاهتمامات.
        </Notice>
        <div className="screen-map">
          {screens.map(([label, path], index) => (
            <Link
              key={path}
              to={path}
              className="screen-link"
              onClick={() => setOpen(false)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
              <Icon name="chevron" size={14} />
            </Link>
          ))}
        </div>
        <h3>ابدأ سيناريو للتقييم</h3>
        <p className="small mt8">
          يُعاد ضبط بيانات التجربة المحلية عند اختيار سيناريو.
        </p>
        <div className="scenario-grid">
          <button className="scenario" onClick={() => scenario("new", "/")}>
            01 · طالب جديد<p>من الصفحة التعريفية إلى CV والمراجعة.</p>
          </button>
          <button
            className="scenario"
            onClick={() => scenario("returning", "/dashboard")}
          >
            02 · طالب عائد<p>مهارات مؤكدة وخطة بها نشاط مكتمل.</p>
          </button>
          <button
            className="scenario"
            onClick={() => scenario("empty", "/careers")}
          >
            03 · دون مهارات مؤكدة
            <p>استبيان وخطة تأسيسية، أو اختيار مجال مباشر.</p>
          </button>
          <button
            className="scenario"
            onClick={() => scenario("courses", "/profile")}
          >
            04 · مقررات فقط<p>مفاهيم منفصلة وغير مؤكدة.</p>
          </button>
        </div>
        <p className="text-xs mt-6">
          الحساب والاستخراج والخطة محاكاة. البيانات والمتطلبات وبنود الاهتمامات
          توضيحية. لا ملفات سيرة أو كلمات مرور تُرفع إلى خادم.
        </p>
      </Modal>
    </>
  );
}
