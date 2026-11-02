import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Brand from "../shared/components/Brand.jsx";
import Button from "../shared/components/Button.jsx";
import Icon from "../shared/components/Icon.jsx";
import { useNaqlah } from "../shared/context/NaqlahContext.jsx";

export default function PublicLayout() {
  const { state } = useNaqlah();
  const { pathname, search } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const home = pathname === "/";
  const section = new URLSearchParams(search).get("section");
  const sections = [
    ["about", "عن نَقلة"],
    ["benefits", "لماذا نَقلة؟"],
    ["paths", "المسارات"],
    ["how-it-works", "كيف تعمل؟"],
    ["faq", "أسئلة شائعة"],
  ];
  return (
    <>
      <header className={`public-header ${home ? "landing-header" : ""}`}>
        <Brand />
        {home ? (
          <>
            <nav
              id="landing-nav"
              className={`landing-nav ${menuOpen ? "open" : ""}`}
              aria-label="أقسام الصفحة الرئيسية"
            >
              {sections.map(([id, label]) => (
                <Link
                  to={`/?section=${id}`}
                  key={id}
                  className={section === id ? "active" : ""}
                  aria-current={section === id ? "location" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <button
              className="icon-btn landing-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="landing-nav"
              aria-label="فتح أقسام الصفحة"
            >
              <Icon name="menu" />
            </button>
          </>
        ) : (
          <nav className="public-nav" aria-label="التنقل العام">
            <Link to="/">الرئيسية</Link>
            <Link
              to="/careers"
              className={pathname.startsWith("/careers") ? "active" : ""}
            >
              المسارات المهنية
            </Link>
          </nav>
        )}
        <div className="public-action row">
          <span className="prototype-pill">
            <Icon name="lock" size={12} /> نموذج خاص
          </span>
          {state.logged ? (
            <Button to="/dashboard" icon="grid">
              لوحة التحكم
            </Button>
          ) : (
            <Button
              to="/auth?mode=login"
              variant={home ? "secondary" : "primary"}
              icon={false}
            >
              تسجيل الدخول
            </Button>
          )}
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="public-footer">
        <Brand />
        <span>خطوة واعية، لمستقبل أوضح.</span>
        <span>نموذج تفاعلي · بيانات توضيحية</span>
      </footer>
    </>
  );
}
