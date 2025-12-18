import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { App, ConfigProvider, theme } from "antd";

export const Route = createRootRoute({
  component: () => (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          // Core colors
          colorPrimary: "#4F8CFF", // academic blue
          colorSuccess: "#3FCF8E",
          colorWarning: "#F5A524",
          colorError: "#FF6B6B",
          colorInfo: "#7AA2F7",

          // Backgrounds
          colorBgBase: "#0F172A", // deep slate (better than pure black)
          colorBgContainer: "#111827",
          colorBgElevated: "#1F2937",

          // Text
          colorTextBase: "#E5E7EB",
          colorTextSecondary: "#9CA3AF",
          colorTextTertiary: "#6B7280",

          // Borders & radius
          borderRadius: 10,
          lineWidth: 1,

          // Fonts
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 14,
        },
        components: {
          Button: {
            borderRadius: 10,
            controlHeight: 40,
            fontWeight: 500,
          },
          Card: {
            borderRadius: 14,
            paddingLG: 20,
            boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
          },
          Calendar: {
            colorBgContainer: "#111827",
            colorText: "#E5E7EB",
            colorPrimary: "#4F8CFF",
          },
          Input: {
            borderRadius: 10,
            controlHeight: 40,
          },
          Modal: {
            borderRadius: 14,
          },
          Tabs: {
            itemSelectedColor: "#4F8CFF",
            inkBarColor: "#4F8CFF",
          },
        },
      }}
    >
      <App>
        <Outlet />
        <TanStackRouterDevtools />
      </App>
    </ConfigProvider>
  ),
});
