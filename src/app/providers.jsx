import { App as AntApp, ConfigProvider } from "antd";
import arEG from "antd/locale/ar_EG";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});
const token = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        direction="rtl"
        locale={arEG}
        theme={{
          token: {
            colorPrimary: token("--blue"),
            colorText: token("--ink"),
            colorTextSecondary: token("--muted"),
            colorBorder: token("--border"),
            colorSuccess: token("--teal"),
            colorWarning: token("--amber"),
            colorError: token("--red"),
            borderRadius: 8,
            controlHeight: 46,
            fontFamily: '"IBM Plex Sans Arabic", Inter, sans-serif',
          },
          components: {
            Card: { borderRadiusLG: 12 },
            Modal: { borderRadiusLG: 16 },
          },
        }}
      >
        <AntApp>{children}</AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
