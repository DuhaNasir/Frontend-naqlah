import { careerPaths } from "./careerCatalog.js";

export function questionnaireComplete(interests) {
  return careerPaths.every(
    (path) =>
      Number.isInteger(interests[path.id]) &&
      interests[path.id] >= 0 &&
      interests[path.id] <= 5,
  );
}
export function questionnaireReady(state) {
  return state.interestSubmitted && questionnaireComplete(state.interests);
}
export function skillMatch(path, confirmed) {
  if (!confirmed.length) return null;
  const unique = new Set(confirmed);
  return Math.round(
    (path.skills.filter((skill) => unique.has(skill)).length /
      path.skills.length) *
      100,
  );
}
export function interestMatch(path, state) {
  if (!questionnaireReady(state)) return null;
  const answer = state.interests[path.id];
  return answer >= 1 && answer <= 5
    ? Math.round(((answer - 1) / 4) * 100)
    : null;
}
export function rankingMode(state) {
  if (state.confirmed.length) return "skills";
  return careerPaths.some((path) => interestMatch(path, state) !== null)
    ? "interest"
    : "";
}
export function rankCareers(state) {
  const mode = rankingMode(state);
  return [...careerPaths].sort((a, b) =>
    mode === "skills"
      ? skillMatch(b, state.confirmed) - skillMatch(a, state.confirmed)
      : mode === "interest"
        ? (interestMatch(b, state) ?? -1) - (interestMatch(a, state) ?? -1)
        : 0,
  );
}
export function skillGap(path, confirmed) {
  if (!confirmed.length) return null;
  return {
    matched: path.skills.filter((skill) => confirmed.includes(skill)),
    missing: path.skills.filter((skill) => !confirmed.includes(skill)),
  };
}
