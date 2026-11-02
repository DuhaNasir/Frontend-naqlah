import { lazy, Suspense, useEffect } from "react";
import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import LoadingState from "../shared/components/LoadingState.jsx";
import ErrorState from "../shared/components/ErrorState.jsx";
import PrototypeTools from "../shared/components/PrototypeTools.jsx";
import { useNaqlah } from "../shared/context/NaqlahContext.jsx";

const HomePage = lazy(() => import("../pages/home/HomePage.jsx"));
const AuthPage = lazy(() => import("../pages/auth/AuthPage.jsx"));
const CvUploadStep = lazy(
  () => import("../pages/auth/components/CvUploadStep.jsx"),
);
const SkillReviewStep = lazy(
  () => import("../pages/auth/components/SkillReviewStep.jsx"),
);
const CareersPage = lazy(() => import("../pages/careers/CareersPage.jsx"));
const CareerDetailsPage = lazy(
  () => import("../pages/careers/CareerDetailsPage.jsx"),
);
const DashboardPage = lazy(
  () => import("../pages/dashboard/DashboardPage.jsx"),
);
const RoadmapPage = lazy(() => import("../pages/roadmap/RoadmapPage.jsx"));
const PracticalWorkPage = lazy(
  () => import("../pages/practical-work/PracticalWorkPage.jsx"),
);
const CoursesPage = lazy(() => import("../pages/courses/CoursesPage.jsx"));
const CourseDetailsPage = lazy(
  () => import("../pages/courses/CourseDetailsPage.jsx"),
);
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage.jsx"));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage.jsx"));
const InterestsPage = lazy(
  () => import("../pages/interests/InterestsPage.jsx"),
);

function ProtectedRoute() {
  const { state } = useNaqlah();
  return state.logged ? <Outlet /> : <Navigate to="/auth?mode=login" replace />;
}
function RouteEffects() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const titles = {
      "/": "الرئيسية",
      "/auth": "الحساب",
      "/onboarding/cv": "إضافة CV",
      "/onboarding/skills": "مراجعة المهارات",
      "/careers": "المسارات المهنية",
      "/dashboard": "لوحة التحكم",
      "/roadmap": "خارطة التعلم",
      "/projects": "الأعمال التطبيقية",
      "/courses": "المقررات والدورات",
      "/profile": "الملف الشخصي",
      "/settings": "الإعدادات",
      "/interests": "الاهتمامات",
    };
    document.title = `${titles[pathname] || (pathname.startsWith("/courses/") ? "تفاصيل الدورة" : pathname.startsWith("/careers/") ? "تفاصيل المسار" : "التفاصيل")} | نَقلة`;
    if (!(pathname === "/" && new URLSearchParams(search).has("section")))
      window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}
export default function AppRouter() {
  return (
    <HashRouter>
      <RouteEffects />
      <Suspense fallback={<LoadingState />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:id" element={<CareerDetailsPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding/cv" element={<CvUploadStep />} />
              <Route path="/onboarding/skills" element={<SkillReviewStep />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/projects" element={<PracticalWorkPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/interests" element={<InterestsPage />} />
            </Route>
          </Route>
          <Route element={<PublicLayout />}>
            <Route path="*" element={<ErrorState />} />
          </Route>
        </Routes>
      </Suspense>
      <PrototypeTools />
    </HashRouter>
  );
}
