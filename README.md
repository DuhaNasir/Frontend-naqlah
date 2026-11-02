
# Naqlah | نَقلة

**AI-Assisted Career Guidance for Computing Students**

Naqlah is an interactive Arabic frontend prototype designed to help computing students explore technical career paths, identify their skills, understand skill gaps, and follow personalized learning roadmaps.

The frontend is developed using **React, JavaScript, Tailwind CSS, and Ant Design**.

The current version includes interactive pages, reusable UI components, navigation, onboarding, career matching demonstrations, and a consistent design system.

> **Project Status:** Interactive frontend prototype. The application currently uses demonstration data and local state. It is not yet connected to the Laravel, PostgreSQL, Python NLP, or Gemini backend.

---

## Table of Contents

1. [Requirements](#requirements)
2. [Run the Project](#run-the-project)
3. [Technology Stack](#technology-stack)
4. [Page Routes](#page-routes)
5. [Project Structure](#project-structure)
6. [Main Files](#main-files)
7. [Page Folder Guide](#page-folder-guide)
8. [Shared Components](#shared-components)
9. [Styles and Design System](#styles-and-design-system)
10. [Layouts and Authentication](#layouts-and-authentication)
11. [Current Prototype Features](#current-prototype-features)
12. [How to Add a New Page](#how-to-add-a-new-page)
13. [Git Workflow](#git-workflow)
14. [Notes](#notes)

---

## Requirements

Before running the project, make sure the following tools are installed:

- Node.js 22.12 or later
- npm
- Git

The project dependencies and their versions are defined in `package.json` and `package-lock.json`.

---

## Run the Project

### 1. Open the project directory

Open the project folder in your terminal.

### 2. Install dependencies

```bash
npm install
```

Alternatively, use the exact dependency versions from the lockfile:

```bash
npm ci
```

### 3. Start the development server

```bash
npm run dev
```

Open the URL displayed in the terminal.

The default Vite development URL is usually:

```text
http://localhost:5173
```

### 4. Build the project

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

### 5. Preview the production build

```bash
npm run preview
```

### 6. Run tests

```bash
npm test
```

### Available Commands

| Command | Description |
|---|---|
| `npm install` | Installs project dependencies. |
| `npm ci` | Installs dependencies using the lockfile. |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates a production build. |
| `npm run preview` | Previews the production build locally. |
| `npm test` | Runs the project tests. |

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Building reusable and interactive UI components. |
| JavaScript | Main programming language. |
| Vite | Development server and build tool. |
| Tailwind CSS | Responsive layouts and utility-based styling. |
| Ant Design | Ready-made UI components such as forms, buttons, modals, and inputs. |
| React Router | Managing navigation and application routes. |
| TanStack Query | Prepared for future API integration and server-state management. |
| Fontsource | Managing locally bundled fonts. |

### Frontend Architecture

The application follows a component-based architecture with separate folders for:

- Application configuration
- Page components
- Layouts
- Shared components
- Custom hooks
- API functions
- Services
- Global styles
- Shared state

This structure supports maintainability, code reuse, and collaboration between frontend team members.

---

## Page Routes

The project uses React Router to manage navigation between pages.

| Route | Page | Description |
|---|---|---|
| `/` | Home | Visitor landing page introducing Naqlah. |
| `/home` | Home Redirect | Redirects to `/`. |
| `/auth` | Authentication | Signup and login. |
| `/careers` | Career Paths | Career exploration and recommendations. |
| `/careers/:id` | Career Details | Career information, matching, and skill gaps. |
| `/dashboard` | Dashboard | Student dashboard. |
| `/roadmap` | Learning Roadmap | Personalized or foundational learning roadmap. |
| `/projects` | Practical Work | Projects, labs, assignments, and practical work. |
| `/courses` | Courses | Courses and learning records. |
| `/courses/:id` | Course Details | Detailed information about a selected course. |
| `/interests` | Interests | Career interest questionnaire. |
| `/profile` | Profile | Student profile and personal information. |
| `/settings` | Settings | Application settings. |
| `/onboarding/cv` | CV Upload | CV selection and skill extraction demonstration. |
| `/onboarding/skills` | Skill Review | Review and confirmation of extracted skills. |

### Important Notes

- `/` is the default visitor landing page.
- `/home` redirects to `/`.
- Routes containing `:id` use dynamic parameters.
- Student pages use the application layout.
- Visitor pages use the public layout.
- The onboarding screens use the public layout with demo route protection.
- The project uses `HashRouter`, so browser URLs may appear as `/#/dashboard`.

---

## Project Structure

```text
naqlah-frontend/
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── DESIGN_SYSTEM.md
│
├── tests/
│   └── careerMatching.test.js
│
└── src/
    │
    ├── main.jsx
    │
    ├── app/
    │   ├── App.jsx
    │   ├── providers.jsx
    │   └── router.jsx
    │
    ├── layouts/
    │   ├── AppLayout.jsx
    │   └── PublicLayout.jsx
    │
    ├── pages/
    │   │
    │   ├── auth/
    │   │   ├── AuthPage.jsx
    │   │   ├── api/
    │   │   ├── components/
    │   │   │   ├── CvUploadStep.jsx
    │   │   │   ├── OnboardingFrame.jsx
    │   │   │   └── SkillReviewStep.jsx
    │   │   ├── hooks/
    │   │   └── services/
    │   │       └── demoExtraction.js
    │   │
    │   ├── careers/
    │   │   ├── CareersPage.jsx
    │   │   ├── CareerDetailsPage.jsx
    │   │   ├── api/
    │   │   ├── components/
    │   │   │   └── CareerCard.jsx
    │   │   ├── hooks/
    │   │   └── services/
    │   │       ├── careerCatalog.js
    │   │       └── careerMatching.js
    │   │
    │   ├── courses/
    │   │   ├── CoursesPage.jsx
    │   │   ├── CourseDetailsPage.jsx
    │   │   ├── api/
    │   │   ├── components/
    │   │   │   └── CourseRecordForm.jsx
    │   │   ├── hooks/
    │   │   └── services/
    │   │
    │   ├── dashboard/
    │   │   ├── DashboardPage.jsx
    │   │   ├── api/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   └── services/
    │   │
    │   ├── home/
    │   │   ├── HomePage.jsx
    │   │   ├── api/
    │   │   ├── components/
    │   │   │   └── JourneyPreview.jsx
    │   │   ├── hooks/
    │   │   └── services/
    │   │       └── homeContent.js
    │   │
    │   ├── interests/
    │   │   ├── InterestsPage.jsx
    │   │   ├── api/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   │   └── useInterestQuestionnaire.js
    │   │   └── services/
    │   │
    │   ├── practical-work/
    │   │   ├── PracticalWorkPage.jsx
    │   │   ├── api/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   └── services/
    │   │       └── workService.js
    │   │
    │   ├── profile/
    │   │   ├── ProfilePage.jsx
    │   │   ├── api/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   └── services/
    │   │
    │   ├── roadmap/
    │   │   ├── RoadmapPage.jsx
    │   │   ├── api/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   └── services/
    │   │       └── roadmapService.js
    │   │
    │   └── settings/
    │       ├── SettingsPage.jsx
    │       ├── api/
    │       ├── components/
    │       ├── hooks/
    │       └── services/
    │
    ├── shared/
    │   ├── components/
    │   │   ├── Badge.jsx
    │   │   ├── Brand.jsx
    │   │   ├── Button.jsx
    │   │   ├── EmptyState.jsx
    │   │   ├── ErrorState.jsx
    │   │   ├── Icon.jsx
    │   │   ├── LoadingState.jsx
    │   │   ├── Notice.jsx
    │   │   ├── PageHeader.jsx
    │   │   ├── PrototypeTools.jsx
    │   │   ├── Stepper.jsx
    │   │   └── skills/
    │   │       ├── MatchIndicator.jsx
    │   │       ├── SkillExtractionPanel.jsx
    │   │       └── SkillItem.jsx
    │   │
    │   └── context/
    │       ├── NaqlahContext.jsx
    │       └── ProfileAvatarContext.jsx
    │
    └── styles/
        ├── design-tokens.css
        └── globals.css
```

Some folders contain `.gitkeep` placeholder files so Git can track them even when they are empty.

---

## Main Files

### Application Setup and Configuration

| File | Description |
|---|---|
| `index.html` | Base HTML file where the React application is mounted. |
| `package.json` | Project dependencies and npm scripts. |
| `package-lock.json` | Locked dependency versions. |
| `vite.config.js` | Vite configuration. |
| `tailwind.config.js` | Tailwind configuration and custom theme settings. |
| `postcss.config.js` | PostCSS configuration. |
| `src/main.jsx` | Application entry point. |
| `src/app/App.jsx` | Main application component. |
| `src/app/providers.jsx` | Ant Design, RTL, and TanStack Query configuration. |
| `src/app/router.jsx` | Route definitions and navigation configuration. |

### Layout Files

**`src/layouts/PublicLayout.jsx`**

Used for visitor-facing pages.

Responsibilities:

- Displays the public header.
- Provides navigation for public pages.
- Does not display the student sidebar.
- Renders child pages using `<Outlet />`.

**`src/layouts/AppLayout.jsx`**

Used for authenticated student application pages in the prototype.

Responsibilities:

- Displays the application sidebar.
- Provides navigation to Dashboard, Roadmap, Projects, and Courses.
- Includes Profile and Settings navigation.
- Supports collapsible sidebar behavior.
- Displays the profile avatar in the header when the sidebar is collapsed.
- Renders child pages using `<Outlet />`.

---

## Page Folder Guide

Every page follows a consistent structure.

Example:

```text
courses/
├── CoursesPage.jsx
├── CourseDetailsPage.jsx
├── api/
├── components/
├── hooks/
└── services/
```

### Folder Responsibilities

| File or Folder | Purpose | When to Use |
|---|---|---|
| `<PageName>Page.jsx` | Main React page component. | Required for the main page. |
| `components/` | Components specific to one page or feature. | When a page contains reusable internal UI elements. |
| `api/` | HTTP requests to backend endpoints. | When backend integration is available. |
| `services/` | Business logic and feature-specific data operations. | When logic should be separated from UI components. |
| `hooks/` | Custom React hooks. | For managing reusable state, effects, or data operations. |
| `.gitkeep` | Placeholder for an empty folder. | When a folder must be tracked by Git. |

### Important Guidelines

- Do not create unnecessary files.
- Start with the main page component.
- Add components when the page becomes more complex.
- Keep business logic separate from UI components.
- Use the `api/` folder for backend requests.
- Use shared components when functionality is reused across multiple pages.
- Remove `.gitkeep` when the folder contains tracked implementation files.

---

## Shared Components

Reusable components are located in:

```text
src/shared/components/
```

### General Components

| Component | Description |
|---|---|
| `Button.jsx` | Reusable button based on Ant Design. |
| `PageHeader.jsx` | Consistent page title, description, and optional action. |
| `LoadingState.jsx` | Loading feedback component. |
| `EmptyState.jsx` | Empty data state component. |
| `ErrorState.jsx` | Error feedback component. |
| `Badge.jsx` | Reusable status badge. |
| `Brand.jsx` | Naqlah branding component. |
| `Icon.jsx` | Shared icon component. |
| `Notice.jsx` | Informational message component. |
| `Stepper.jsx` | Multi-step workflow indicator. |
| `PrototypeTools.jsx` | Prototype demonstration and navigation utilities. |

### Skill Components

Located in:

```text
src/shared/components/skills/
```

| Component | Description |
|---|---|
| `SkillItem.jsx` | Displays a skill and its status. |
| `SkillExtractionPanel.jsx` | Displays and supports review of candidate skills. |
| `MatchIndicator.jsx` | Displays Skill Match or Interest Match scores separately. |

### When to Use Shared Components

Use `src/shared/components/` when a component is needed by multiple pages.

For components used only within one feature, place them inside that feature's `components/` folder.

### Shared Context

Shared application state is managed in:

```text
src/shared/context/
```

**`NaqlahContext.jsx`**

Manages demonstration data related to:

- Student onboarding
- Confirmed skills
- Career selection
- Learning progress
- Roadmap information

**`ProfileAvatarContext.jsx`**

Provides shared profile information such as the user's name and avatar.

The prototype uses `localStorage` for local persistence.

This is not a database connection.

---

## Styles and Design System

The project follows the Naqlah design system to maintain a consistent appearance across all pages.

### Design Files

| File | Description |
|---|---|
| `DESIGN_SYSTEM.md` | Documentation for colors, typography, spacing, and UI guidelines. |
| `src/styles/design-tokens.css` | Shared CSS variables and design tokens. |
| `src/styles/globals.css` | Global styling and responsive behavior. |

### Main Design Colors

| Usage | Color |
|---|---|
| Primary | `#2563EB` |
| Page Background | `#F8FAFC` |
| Card Background | `#FFFFFF` |
| Main Text | `#0F172A` |
| Secondary Text | `#64748B` |
| Confirmed Skills | `#0F766E` |
| Skill Match | `#2563EB` |
| Interest Match | `#7C3AED` |
| Missing Skills | `#B45309` |
| Error | `#DC2626` |

### Design Guidelines

- Follow the existing design tokens.
- Reuse shared components.
- Use Ant Design components when appropriate.
- Use Tailwind CSS for responsive layouts.
- Maintain Arabic and RTL support.
- Keep layouts consistent across pages.
- Avoid duplicating styling unnecessarily.

For more information, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

---

## Layouts and Authentication

### Public Pages

Public pages use `PublicLayout`.

Examples:

- Home
- Authentication
- Career Paths
- Career Details

These pages do not display the student sidebar.

### Student Pages

Student pages use `AppLayout`.

Examples:

- Dashboard
- Roadmap
- Projects
- Courses
- Interests
- Profile
- Settings

These pages display the student application navigation.

### Authentication Status

The current prototype includes simulated authentication and route protection.

- Visitors initially see the landing page.
- The onboarding experience supports demonstration signup and login.
- Demo-protected routes redirect users who are not signed in.
- Returning users can access the demonstration dashboard.

**Important:** Production authentication and authorization have not been implemented.

Real authentication and protected API access must be enforced by the backend during integration.

---

## Current Prototype Features

### 1. Landing Page

The visitor landing page introduces Naqlah and includes:

- Hero section
- Platform introduction
- Main benefits
- Available career paths
- How Naqlah works
- Frequently asked questions
- Navigation links to page sections

### 2. Student Onboarding

The prototype demonstrates a student journey that includes:

1. Signup or login.
2. CV selection or manual skill entry.
3. Review of candidate skills.
4. Skill confirmation.
5. Career path selection or interest questionnaire.
6. Career matching.
7. Learning roadmap.
8. Progress tracking through the dashboard.

### 3. Skill Confirmation

Skills extracted from CVs or practical work remain candidate skills until confirmed by the student.

Course concepts do not automatically become confirmed skills.

Only confirmed skills affect Skill Match.

### 4. Career Matching

The application supports two independent matching concepts.

**Skill Match**

Calculated using confirmed required skills:

```text
Skill Match =
(Confirmed Required Skills / Total Required Skills) × 100
```

**Interest Match**

Calculated using questionnaire responses:

```text
Interest Match =
((Mean Response - 1) / 4) × 100
```

The two scores remain separate.

When confirmed skills exist, career recommendations are ranked by Skill Match.

Otherwise, valid Interest Match scores can be used.

If neither is available, students can still select a career path without a calculated score.

### 5. Learning Roadmap

The prototype includes:

- Foundational roadmap when confirmed skills are unavailable.
- Skill-gap-focused roadmap when confirmed skills exist.
- Learning activities and prerequisites.
- Progress tracking.
- Preservation of completed activities when changing career paths.

Roadmap content is currently illustrative and is not generated through a live Gemini API.

### 6. Practical Work

Students can enter practical work information, including:

- Work title
- Work type
- Optional course association
- Description
- Applied concepts

PDF analysis of practical work is not currently implemented.

### 7. Student Dashboard

The dashboard demonstrates the returning-student experience, including learning progress and available student information.

### Prototype Limitations

The current frontend does not include:

- Live Laravel API integration
- PostgreSQL database integration
- Production authentication
- Real Python NLP extraction
- Live Gemini roadmap generation
- Job Advertisement Analyzer
- Skill proficiency assessment

Current career requirements and questionnaire items are illustrative and should not be treated as validated Saudi labor-market data.

---

## How to Add a New Page

This section explains how frontend team members should add a new page while maintaining the existing architecture.

**Example:** Adding a student page called `Certificates`.

### Step 1: Create a New Branch

Before starting a new feature, switch to the main branch and pull the latest changes.

```bash
git switch main
git pull origin main
```

Create a branch for the new feature:

```bash
git switch -c feature/certificates-page
```

Do not develop new features directly on `main`.

### Step 2: Create the Page Folder

Inside `src/pages/`, create:

```text
certificates/
```

Add the main page file:

```text
src/pages/certificates/CertificatesPage.jsx
```

The feature can follow this structure:

```text
certificates/
├── CertificatesPage.jsx
├── api/
├── components/
├── hooks/
└── services/
```

Add files to these folders only when needed.

### Step 3: Create the Page Component

Inside `CertificatesPage.jsx`:

```jsx
import PageHeader from '../../shared/components/PageHeader.jsx';

export default function CertificatesPage() {
  return <PageHeader title="Certificates" />;
}
```

This creates a basic page using the existing shared `PageHeader` component.

### Step 4: Register the Route

Open:

```text
src/app/router.jsx
```

Import the new page:

```jsx
import CertificatesPage from '../pages/certificates/CertificatesPage.jsx';
```

Add a route inside the appropriate existing layout group:

```jsx
<Route
  path="/certificates"
  element={<CertificatesPage />}
/>
```

Use `AppLayout` for student pages and `PublicLayout` for visitor pages.

Keep route definitions inside `router.jsx`.

Layouts should render their child pages using `<Outlet />`.

Do not create another `<Routes>` block inside a layout component.

### Step 5: Add the Page to the Sidebar if Needed

If the page should appear in the student sidebar, open:

```text
src/layouts/AppLayout.jsx
```

Add an appropriate navigation entry.

For example:

```jsx
{
  to: '/certificates',
  label: 'Certificates',
  icon: <SafetyCertificateOutlined />
}
```

Import the icon from:

```jsx
import { SafetyCertificateOutlined } from '@ant-design/icons';
```

Adapt the entry to the existing navigation structure.

Only add sidebar links for pages that belong in the main navigation.

### Step 6: Add Feature-Specific Files

If the page requires data fetching and additional UI elements, use the standard folders.

Example:

```text
certificates/
├── CertificatesPage.jsx
│
├── api/
│   └── certificatesApi.js
│
├── services/
│   └── certificatesService.js
│
├── hooks/
│   └── useCertificates.js
│
└── components/
    └── CertificateCard.jsx
```

**File responsibilities:**

- `certificatesApi.js`: Makes HTTP requests.
- `certificatesService.js`: Handles feature-specific data logic.
- `useCertificates.js`: Connects data and React state.
- `CertificateCard.jsx`: Displays a certificate.
- `CertificatesPage.jsx`: Assembles the page components.

This is an example only.

Do not create files that are not needed.

### Step 7: Follow the Design System

Before styling the page:

1. Review `DESIGN_SYSTEM.md`.
2. Reuse existing shared components.
3. Use design tokens.
4. Use Tailwind CSS for layouts.
5. Use Ant Design components when appropriate.
6. Verify responsive behavior.
7. Maintain Arabic and RTL support.

### Step 8: Test Your Changes

Run:

```bash
npm test
npm run build
```

Fix any errors before committing the changes.

### Step 9: Commit Your Work

Stage the changes:

```bash
git add .
```

Create a descriptive commit:

```bash
git commit -m "Add certificates page"
```

### Step 10: Push Your Branch

Upload the branch to GitHub:

```bash
git push -u origin feature/certificates-page
```

After pushing, the branch will be available in the remote repository.

Follow the team's review and merge process before merging into `main`.

---

## Git Workflow

Each frontend team member should work on a separate feature branch.

### 1. Update Main

```bash
git switch main
git pull origin main
```

### 2. Create a Feature Branch

```bash
git switch -c feature/feature-name
```

### 3. Implement the Feature

Make the required changes while following the project structure and design system.

### 4. Test the Changes

```bash
npm test
npm run build
```

### 5. Commit the Changes

```bash
git add .
git commit -m "Describe your changes"
```

### 6. Push to GitHub

For the first push:

```bash
git push -u origin feature/feature-name
```

For later updates on the same branch:

```bash
git add .
git commit -m "Update feature"
git push
```

### Commit Guidelines

- Write clear and descriptive commit messages.
- Commit meaningful changes.
- Do not push unnecessary generated files.
- Keep `.env` files and secrets out of Git.
- Do not work directly on `main` for new features.
- Push completed work to the remote repository.
- Review changes before merging.

### Recommended `.gitignore`

```gitignore
node_modules/
dist/
.DS_Store
.env
.env.*
!.env.example
```

---

## Notes

- The project currently uses React with JavaScript, not TypeScript.
- Tailwind CSS and Ant Design are both part of the approved frontend stack.
- The default route `/` opens the visitor landing page.
- The student dashboard uses the application layout.
- Shared components should be reused instead of duplicated.
- Each page has a consistent folder organization.
- Empty folders use `.gitkeep` placeholders.
- CV extraction, authentication, and roadmap generation are simulated.
- The frontend is prepared for future backend integration.
- API keys and private credentials must not be stored in frontend source files.
- Responsive CSS is included, but real-device testing is still required.
- The production build and five service tests were reported as passing in the previous prototype verification. These checks should be rerun after future code changes.

---

**Naqlah Frontend — Graduation Project**

