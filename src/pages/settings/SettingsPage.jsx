import { Popconfirm, Select, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { useNaqlah } from "../../shared/context/NaqlahContext.jsx";
import PageHeader from "../../shared/components/PageHeader.jsx";
import Button from "../../shared/components/Button.jsx";
import Notice from "../../shared/components/Notice.jsx";
import Badge from "../../shared/components/Badge.jsx";

export default function SettingsPage() {
  const { resetDemo, patch } = useNaqlah();
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        title="الإعدادات"
        subtitle="إعدادات النسخة التجريبية وبياناتك المحلية."
      />
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        <section className="card">
          <h2>اللغة والمظهر</h2>
          <div className="spread mt24">
            <div>
              <h3 className="text-base">لغة الواجهة</h3>
              <p className="small">النسخة الحالية عربية وباتجاه RTL.</p>
            </div>
            <Select
              value="ar"
              disabled
              options={[{ value: "ar", label: "العربية" }]}
              style={{ width: 110 }}
              aria-label="لغة الواجهة"
            />
          </div>
          <div className="divider" />
          <div className="spread">
            <div>
              <h3 className="text-base">حفظ حالة التجربة</h3>
              <p className="small">محليًا في هذا المتصفح، لتعود إلى تقدمك.</p>
            </div>
            <Switch checked disabled aria-label="حفظ حالة التجربة المحلية" />
          </div>
          <div className="mt24">
            <Badge color="blue">نموذج خاص · بيانات توضيحية</Badge>
          </div>
        </section>
        <section className="card">
          <h2>بيانات التجربة</h2>
          <p className="small mt16">
            يمكنك إعادة النموذج إلى بداية نظيفة. هذا يمسح بيانات التجربة في هذا
            المتصفح فقط.
          </p>
          <div className="mt24">
            <Popconfirm
              title="بدء تجربة جديدة؟"
              description="ستُمسح مهارات التجربة وخطتها من هذا المتصفح."
              okText="بدء تجربة جديدة"
              cancelText="إلغاء"
              onConfirm={() => {
                resetDemo("new");
                navigate("/");
              }}
            >
              <Button variant="secondary" icon="spark">
                إعادة ضبط التجربة
              </Button>
            </Popconfirm>
          </div>
          <div className="divider" />
          <Button
            variant="ghost"
            icon="logout"
            onClick={() => {
              patch({ logged: false });
              navigate("/");
            }}
          >
            تسجيل الخروج
          </Button>
        </section>
      </div>
      <Notice tone="neutral" className="mt24">
        تسجيل الحساب واستخراج المهارات وتوليد الخطة في هذا النموذج محاكاة. لا
        يُرفع ملف CV أو كلمة مرور إلى خادم.
      </Notice>
    </>
  );
}
