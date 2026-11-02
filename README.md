# Naqlah Frontend

A private, interactive Arabic prototype rebuilt with React, JavaScript, Tailwind CSS, Ant Design, React Router, and TanStack Query. This preserves the approved landing page, onboarding journey, separate match scores, roadmap, and returning-student dashboard. It is a local-state prototype, not the Laravel/Python/Gemini backend.

## Setup and commands

Use Node.js 22.12 or later and npm. Versions are locked in `package-lock.json`.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. Other commands:

```bash
npm run build
npm run preview
npm test
```

Build output goes to `dist/`. The tests use Node's built-in runner. No TypeScript application files or build setup are used.

## Stack

- React with `.js` and `.jsx` files, built with Vite.
- Tailwind CSS 3.4, matching the requested `tailwind.config.js` and `postcss.config.js` structure. Responsive grids and layout use Tailwind; custom brand styles use shared CSS variables.
- Ant Design controls: forms, inputs, selectors, buttons, upload UI, checkboxes, radios, modals, tabs, progress, avatars, tooltips, notifications, collapse panels, and settings controls. Arabic, RTL, and theme configuration live in `providers.jsx`.
- React Router with nested routes and `<Outlet />`. `HashRouter` preserves the existing deployed `#/...` links and supports static hosting without rewrite rules. Paths below refer to the router paths.
- TanStack Query is configured once for future API work. No fake HTTP endpoints are included.
- IBM Plex Sans Arabic and Inter are bundled locally through Fontsource imports in `main.jsx`, without a font CDN.

## Routes

| Route                | Component                               | Layout                  |
| -------------------- | --------------------------------------- | ----------------------- |
| `/`                  | HomePage: visitor landing page          | Public                  |
| `/home`              | Redirect to `/`                         | Public                  |
| `/auth`              | AuthPage: signup and login              | Public                  |
| `/careers`           | CareersPage: field question and results | Public                  |
| `/careers/:id`       | CareerDetailsPage: match and gap        | Public                  |
| `/dashboard`         | DashboardPage                           | Protected app           |
| `/roadmap`           | RoadmapPage                             | Protected app           |
| `/projects`          | PracticalWorkPage                       | Protected app           |
| `/courses`           | CoursesPage                             | Protected app           |
| `/courses/:id`       | CourseDetailsPage, e.g. `python-basics` | Protected app           |
| `/interests`         | InterestsPage                           | Protected app           |
| `/profile`           | ProfilePage                             | Protected app           |
| `/settings`          | SettingsPage                            | Protected app           |
| `/onboarding/cv`     | auth/components/CvUploadStep            | Protected public layout |
| `/onboarding/skills` | auth/components/SkillReviewStep         | Protected public layout |

There are 14 distinct screens, excluding the `/home` alias and counting dynamic detail templates once. Settings and Course Details are now full pages as requested. CV upload and review remain components inside the auth folder. The floating screen map includes all 14 screens and four demo scenarios. The supplied example career ID `software-engineering` is accepted as an alias for the canonical `web` path.

## Folder structure

```text
naqlah-frontend/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── DESIGN_SYSTEM.md
├── tests/
└── src/
    ├── main.jsx
    ├── app/
    │   ├── App.jsx
    │   ├── providers.jsx
    │   └── router.jsx
    ├── layouts/
    │   ├── AppLayout.jsx
    │   └── PublicLayout.jsx
    ├── pages/
    │   ├── auth/
    │   ├── careers/
    │   ├── courses/
    │   ├── dashboard/
    │   ├── home/
    │   ├── interests/
    │   ├── practical-work/
    │   ├── profile/
    │   ├── roadmap/
    │   └── settings/
    ├── shared/
    │   ├── components/
    │   │   ├── Button.jsx
    │   │   ├── EmptyState.jsx
    │   │   ├── ErrorState.jsx
    │   │   ├── LoadingState.jsx
    │   │   ├── PageHeader.jsx
    │   │   ├── Badge.jsx
    │   │   ├── Brand.jsx
    │   │   ├── Icon.jsx
    │   │   ├── Notice.jsx
    │   │   ├── PrototypeTools.jsx
    │   │   ├── Stepper.jsx
    │   │   └── skills/
    │   │       ├── MatchIndicator.jsx
    │   │       ├── SkillExtractionPanel.jsx
    │   │       └── SkillItem.jsx
    │   └── context/
    │       ├── NaqlahContext.jsx
    │       └── ProfileAvatarContext.jsx
    └── styles/
        ├── design-tokens.css
        └── globals.css
```

Every page folder contains `api`, `components`, `hooks`, and `services`; empty folders retain `.gitkeep`. Use only the files a page needs. Matching and the career catalog are in `careers/services`, demo roadmap logic in `roadmap/services`, questionnaire behavior in `interests/hooks`, and page-only UI in its `components` folder. The `api` folders stay empty until backend contracts exist.

## Layouts and state

`PublicLayout` has no student sidebar. Home has section links for About, Benefits, Paths, How it works, and FAQ. Other public pages use the smaller public navigation.

`AppLayout` contains Dashboard, Roadmap, Projects/Practical Work, and Courses. Profile and Settings are icon utilities at the bottom. The hamburger works on laptops and mobile; clicking page content closes the sidebar. Collapsed navigation is inert and excluded from keyboard access. When collapsed, the header avatar links to Profile. An uploaded local image is used when present, otherwise the first letter is shown.

`NaqlahContext` stores demo state in localStorage under `naqlah-onboarding-prototype-v1`, retaining compatible earlier prototype data. `ProfileAvatarContext` exposes the same profile fields rather than maintaining a conflicting copy. Images stay local.

The route guard redirects signed-out users before protected routes. This is only demo authentication. The private Sites visitor gate is separate; do not use client state for production authorization.

## Preserved rules and prototype limits

1. Signup leads to CV upload as the main starting point; manual skill entry is available.
2. CV and practical-work skills remain candidates until explicit confirmation. Course concepts and learning completion do not automatically confirm skills.
3. Ask whether the student is interested in a specific field. Yes reveals path choices and the skill gap. No requires the full questionnaire before results. Unknown activities count as answered but are excluded from scoring.
4. Show Skill Match and Interest Match separately. Rank by skills whenever confirmed skills exist, otherwise by available interests. Never combine scores.
5. Skill Match = confirmed required skills / required skills. Without confirmed skills, no skill percentage or computed gap is shown. Unknown scores are unavailable, not fabricated 0%.
6. Interest Match = `(mean - 1) / 4 * 100`. This prototype has one illustrative item per path, so that answer is its path mean. Draft answers do not produce final results. If all interests are unknown and no skills exist, paths remain selectable without match ordering.
7. Roadmaps are foundational without confirmed skills and focus on missing requirements otherwise. Prerequisites control activity order. Completed records survive path and skill changes.
8. Applied work is typed text: title, type, optional course link, description, and concepts. No work-PDF or course-description upload is included. Work completes a roadmap project only when explicitly linked to that activity.
9. Login, extraction, and roadmap generation are simulations. Passwords and CV file contents are not transmitted or persisted. CV selection stores its filename only and displays illustrative candidates. Typed concepts use simple splitting and canonical-name matching, not NLP.
10. Requirement lists, interest items, and activities are illustrative fixtures, not validated Saudi labor-market data or a final research questionnaire. There is no Job Advertisement Analyzer, proficiency assessment, soft-skill assessment, or backend connection.

The 25 MiB CV selection limit and 2 MiB local avatar limit are prototype choices. Do not put API keys in frontend code.

## Shared components and design

`Button` uses Ant Design for actions and React Router links for navigation. `PageHeader` combines title, supporting text, and an optional action. Loading, empty, and error states use Ant Design feedback primitives. `SkillItem` combines a name and a text status. `SkillExtractionPanel` provides candidate checkbox review or read-only groups. `MatchIndicator` displays one independent blue skill or purple interest score.

Read `DESIGN_SYSTEM.md`. CSS tokens are defined in `src/styles/design-tokens.css`; Tailwind and Ant Design reference the same values. Reuse components from `shared` rather than duplicating them in page folders.

## Add a page

In the team's repository, start a branch:

```bash
git switch main
git pull
git switch -c feature/certificates-page
```

Create `src/pages/certificates/CertificatesPage.jsx` and its four standard child folders. Start with:

```jsx
import PageHeader from "../../shared/components/PageHeader.jsx";
export default function CertificatesPage() {
  return <PageHeader title="Certificates" />;
}
```

Register the component in `src/app/router.jsx` under the right layout. Layouts render `<Outlet />`; they do not define another `<Routes>` block. Add a sidebar entry in `AppLayout` only if the page belongs in primary navigation. Put actual HTTP calls in `api`, data operations in `services`, and React/TanStack Query integration in `hooks` when needed.

Run checks, commit, and push:

```bash
npm test
npm run build
git add .
git commit -m "Add certificates page"
git push -u origin feature/certificates-page
```

The downloadable source excludes Git metadata, node_modules, build output, and hosted Site identity. Configure your own team remote with `git remote add origin <repository-url>` when needed. No team repository URL is assumed.

## Verification

The production build and five service tests pass. Browser checks cover the landing page, signup, CV demo, candidate review and manual Git entry, required-questionnaire validation, independent scores and skill-first ordering, course completion, prerequisites, and preserving completed REST APIs when changing paths. Additional browser checks cover academic-course entry, typed lab saving, explicit confirmation of PostgreSQL without automatically confirming SQL, profile name updates, the standalone Settings page, the collapsible sidebar, and the returning-student dashboard. A local-HTTP record-ID issue found during testing was fixed and the save flow was verified again. Responsive CSS is present; an actual mobile device has not been tested.
