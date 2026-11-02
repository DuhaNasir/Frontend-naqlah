import { Form, Input } from "antd";
import Button from "../../../shared/components/Button.jsx";
import Notice from "../../../shared/components/Notice.jsx";
import { prepareConcepts } from "../../auth/services/demoExtraction.js";

export default function CourseRecordForm({ onSave }) {
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      onFinish={(values) =>
        onSave({
          name: values.name.trim(),
          concepts: values.concepts.trim(),
          skills: prepareConcepts(values.concepts),
        })
      }
    >
      <Form.Item
        name="name"
        label="اسم المقرر"
        rules={[
          { required: true, whitespace: true, message: "اكتب اسم المقرر." },
        ]}
      >
        <Input placeholder="مثل: قواعد البيانات" maxLength={120} />
      </Form.Item>
      <Form.Item
        name="concepts"
        label="المفاهيم التي تعلمتها"
        rules={[
          { required: true, whitespace: true, message: "اكتب المفاهيم." },
        ]}
      >
        <Input.TextArea
          placeholder="مثل: SQL, Database Design, Transactions"
          rows={4}
          maxLength={1200}
        />
      </Form.Item>
      <Notice>
        ستُحفظ كمهارات غطتها المقررات، وتبقى غير مؤكدة. تجهيز المهارات هنا
        توضيحي للتجربة.
      </Notice>
      <div className="mt24">
        <Button htmlType="submit" className="full" icon="check">
          حفظ المقرر
        </Button>
      </div>
    </Form>
  );
}
