import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { sampleSkills } from "../../pages/auth/services/demoExtraction.js";

const KEY = "naqlah-onboarding-prototype-v1";
export const initialState = () => ({
  logged: false,
  name: "",
  email: "",
  major: "",
  avatar: "",
  cv: "",
  candidates: [],
  review: [],
  confirmed: [],
  covered: [],
  interests: {},
  interestSubmitted: false,
  pathMode: "",
  path: "",
  started: false,
  completed: {},
  courses: [],
  works: [],
  onboarding: true,
});
// Preserve context identity when Vite hot-reloads this module during development.
const Context = import.meta.hot?.data.naqlahContext ?? createContext(null);
if (import.meta.hot) import.meta.hot.data.naqlahContext = Context;
function readState() {
  try {
    return {
      ...initialState(),
      ...JSON.parse(localStorage.getItem(KEY) || "null"),
    };
  } catch {
    return initialState();
  }
}

export function NaqlahProvider({ children }) {
  const [state, setState] = useState(readState);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* The demo still works when browser storage is unavailable. */
    }
  }, [state]);
  const patch = useCallback(
    (changes) =>
      setState((previous) => ({
        ...previous,
        ...(typeof changes === "function" ? changes(previous) : changes),
      })),
    [],
  );
  const resetDemo = useCallback((scenario = "new") => {
    const next = initialState();
    if (scenario !== "new")
      Object.assign(next, {
        logged: true,
        name: "ضحى",
        email: "duha@example.com",
        major: "علوم الحاسب",
        onboarding: false,
      });
    if (scenario === "returning")
      Object.assign(next, {
        cv: "سيرة تجريبية",
        confirmed: ["HTML", "CSS", "JavaScript", "React", "Python", "SQL"],
        candidates: sampleSkills,
        review: ["HTML", "CSS", "JavaScript", "React", "Python", "SQL"],
        path: "web",
        pathMode: "direct",
        started: true,
        completed: {
          "concept:Git": {
            title: "Git",
            pathName: "تطوير البرمجيات والويب",
            skills: ["Git"],
          },
        },
        covered: ["Git"],
      });
    if (scenario === "courses")
      Object.assign(next, {
        covered: ["Python", "SQL"],
        courses: [
          {
            name: "مقدمة في البرمجة وقواعد البيانات",
            concepts: "Python, SQL",
            skills: ["Python", "SQL"],
          },
        ],
      });
    setState(next);
  }, []);
  return (
    <Context.Provider value={{ state, patch, setState, resetDemo }}>
      {children}
    </Context.Provider>
  );
}
export function useNaqlah() {
  const value = useContext(Context);
  if (!value) throw new Error("useNaqlah must be inside NaqlahProvider");
  return value;
}
