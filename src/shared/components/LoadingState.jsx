import { Spin } from "antd";
export default function LoadingState({ text = "جاري تجهيز الصفحة…" }) {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center gap-5"
      role="status"
    >
      <Spin size="large" />
      <p>{text}</p>
    </div>
  );
}
