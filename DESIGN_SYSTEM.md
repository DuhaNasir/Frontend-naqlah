# Naqlah Design System

## Central tokens

`src/styles/design-tokens.css` defines colors, radii, and shadow. Tailwind references CSS variables in `tailwind.config.js`. Ant Design reads the same variables through `ConfigProvider` in `providers.jsx`.

| Purpose                                                | Token      | Value     |
| ------------------------------------------------------ | ---------- | --------- |
| Primary actions, links, active navigation, Skill Match | `--blue`   | `#2563EB` |
| Page background                                        | `--paper`  | `#F8FAFC` |
| Cards and fields                                       | `--white`  | `#FFFFFF` |
| Main text                                              | `--ink`    | `#0F172A` |
| Supporting text                                        | `--muted`  | `#64748B` |
| Confirmed skills and learning progress                 | `--teal`   | `#0F766E` |
| Interest Match                                         | `--purple` | `#7C3AED` |
| Missing skills                                         | `--amber`  | `#B45309` |
| Actual errors                                          | `--red`    | `#DC2626` |
| Borders                                                | `--border` | `#E2E8F0` |

Missing skills are amber, not error red. Every skill includes a text status. Unavailable scores are labeled “غير محسوب” with a reason; they are not displayed as 0%.

## Typography and direction

- Arabic: IBM Plex Sans Arabic, weights 400, 500, 600, 700.
- Latin and numbers: Inter, weights 400 and 600. Use `.ltr` for isolated English content.
- Fonts are imported once in `main.jsx` from local Fontsource packages.
- The document uses Arabic and RTL. Ant Design uses the Arabic locale and RTL globally.
- Page titles: 32px, reducing to 27px on small screens. Section headings: 22px. Card titles: 18px. Body: 16px. Helper text: 12–14px. The landing hero uses a larger responsive heading.

## Spacing and components

Use the 4, 8, 12, 16, 24, 32, 48px spacing family and corresponding Tailwind utilities. Cards use 12px corners and light borders; controls and compact status elements use 8px corners. Shadows are subtle. Larger hero and CTA surfaces may have larger radii.

`Button` wraps Ant Design for actions and uses a router link for navigation. Variants are primary, secondary, light, and ghost. `PageHeader` has a title, supporting text, and optional action. `LoadingState`, `EmptyState`, and `ErrorState` provide consistent feedback.

`SkillItem` displays the skill name and candidate, confirmed, covered, or missing status together. `SkillExtractionPanel` manages candidate review or read-only groups without confirming course concepts. `MatchIndicator` uses blue for Skill Match and purple for Interest Match, with separate labels and bars.

`ProfileAvatarContext` is state, not a visual component. Show the uploaded local image or an initial fallback. Page-only UI belongs in that page's `components` folder; reusable UI belongs in `shared/components`.

## Layout and accessibility

Public pages have no sidebar. The landing header links to sections. The app has a collapsible RTL sidebar, primary links for Dashboard, Roadmap, Practical Work, and Courses, and bottom Profile/Settings utilities. The hamburger remains available on laptops; page clicks close the sidebar. On mobile, open navigation has a backdrop. Collapsed navigation is inert and excluded from keyboard navigation.

Keep labeled forms, semantic headings, visible focus indicators, keyboard-operable dialogs, text status labels, and clear validation feedback. Respect reduced-motion preferences. English technical content should retain readable direction. Course completion is not a proficiency claim.
