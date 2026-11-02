import { useState } from "react";
import { Avatar, Tooltip } from "antd";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Brand from "../shared/components/Brand.jsx";
import Icon from "../shared/components/Icon.jsx";
import Badge from "../shared/components/Badge.jsx";
import { useNaqlah } from "../shared/context/NaqlahContext.jsx";
import { useProfileAvatar } from "../shared/context/ProfileAvatarContext.jsx";

const primaryLinks = [
  ["grid", "لوحة التحكم", "/dashboard"],
  ["route", "خارطة التعلم", "/roadmap"],
  ["briefcase", "المشاريع والأعمال", "/projects"],
  ["book", "المقررات والدورات", "/courses"],
];
export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 1100);
  const { state, patch } = useNaqlah();
  const { name, avatar } = useProfileAvatar();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title =
    {
      "/dashboard": "لوحة التحكم",
      "/roadmap": "خارطة التعلم",
      "/projects": "الأعمال التطبيقية",
      "/courses": "المقررات والدورات",
      "/profile": "الملف الشخصي",
      "/settings": "الإعدادات",
      "/interests": "الاهتمامات",
    }[pathname] || "تفاصيل الدورة";
  const letter = name?.trim()[0] || "ن";
  return (
    <div className={`app-shell ${collapsed ? "is-collapsed" : ""}`}>
      {!collapsed && (
        <button
          className="sidebar-backdrop app-sidebar-backdrop"
          onClick={() => setCollapsed(true)}
          aria-label="إغلاق قائمة التنقل"
        />
      )}
      <aside
        className={`sidebar ${!collapsed ? "open" : ""}`}
        aria-hidden={collapsed}
        inert={collapsed ? true : undefined}
      >
        <Brand />
        <div className="sidebar-label">مساحتك في نَقلة</div>
        <nav className="side-nav" aria-label="التنقل الرئيسي">
          {primaryLinks.map(([icon, label, to]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => {
                if (window.innerWidth < 820) setCollapsed(true);
              }}
            >
              <Icon name={icon} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="card soft" style={{ padding: 14, marginBottom: 24 }}>
            <Badge color="teal" icon="spark">
              كل خطوة تصنع فرقًا
            </Badge>
            <p className="mt8 text-xs">تعلمك اليوم يقربك من مسارك.</p>
          </div>
          <div className="side-profile">
            <Tooltip title="الملف الشخصي">
              <NavLink to="/profile" aria-label="الملف الشخصي">
                <Icon name="user" />
              </NavLink>
            </Tooltip>
            <Tooltip title="الإعدادات">
              <NavLink to="/settings" aria-label="الإعدادات">
                <Icon name="settings" />
              </NavLink>
            </Tooltip>
            <Tooltip title="تسجيل الخروج">
              <button
                onClick={() => {
                  patch({ logged: false });
                  navigate("/");
                }}
                aria-label="تسجيل الخروج"
              >
                <Icon name="logout" />
              </button>
            </Tooltip>
          </div>
          <div className="sidebar-caption">نَقلة · خطوتك التالية</div>
        </div>
      </aside>
      <div className="workspace">
        <header className="app-topbar">
          <div className="row">
            <button
              className="icon-btn sidebar-toggle"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "فتح قائمة التنقل" : "طي قائمة التنقل"}
              aria-expanded={!collapsed}
            >
              <Icon name="menu" />
            </button>
            <div className="crumb">
              <Link to="/">الرئيسية</Link>
              <Icon name="chevron" size={13} />
              <span>{title}</span>
            </div>
          </div>
          <div className="row">
            <span className="prototype-pill">
              <Icon name="lock" size={12} /> نموذج خاص · بيانات توضيحية
            </span>
            {collapsed && (
              <Link
                to="/profile"
                className="user-mini"
                aria-label="فتح الملف الشخصي"
              >
                <span className="user-name">{name?.split(" ")[0]}</span>
                <Avatar
                  src={avatar || undefined}
                  style={{ background: "#dbeafe", color: "var(--blue)" }}
                >
                  {letter}
                </Avatar>
              </Link>
            )}
          </div>
        </header>
        <main
          id="main"
          className="app-content"
          onClick={() => {
            if (!collapsed) setCollapsed(true);
          }}
        >
          <Outlet />
          <div className="app-footer">
            <span>نَقلة، من مهاراتك اليوم إلى مسارك غدًا.</span>
            <span>
              تعكس المهارات المؤكدة مراجعتك الذاتية، ولا تمثل اختبار إتقان.
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
