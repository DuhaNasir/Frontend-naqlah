import { Result } from "antd";
import Button from "./Button.jsx";
export default function ErrorState({
  title = "هذه الصفحة غير موجودة.",
  description = "عد إلى البداية وأكمل رحلتك.",
}) {
  return (
    <Result
      status="404"
      title={title}
      subTitle={description}
      extra={<Button to="/">العودة للرئيسية</Button>}
    />
  );
}
