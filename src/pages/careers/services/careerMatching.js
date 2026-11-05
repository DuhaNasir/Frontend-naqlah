
import { careerPaths } from "./careerCatalog.js";

const isAnswered = (value) =>
  Number.isInteger(value) && value >= 0 && value <= 5;

export function questionnaireComplete(interests) {
  return careerPaths.every((path) =>
    path.questions.every((question) =>
      isAnswered(interests?.[question.id]),
    ),
  );
}

export function questionnaireReady(state) {
  return (
    state.interestSubmitted &&
    questionnaireComplete(state.interests)
  );
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

  const validAnswers = path.questions
    .map((question) => state.interests[question.id])
    .filter((answer) =>
      Number.isInteger(answer) && answer >= 1 && answer <= 5,
    );

  if (validAnswers.length === 0) return null;

  const average =
    validAnswers.reduce((sum, answer) => sum + answer, 0) /
    validAnswers.length;

  return Math.round(((average - 1) / 4) * 100);
}

export function rankingMode(state) {
  if (state.confirmed.length) return "skills";

  return careerPaths.some(
    (path) => interestMatch(path, state) !== null,
  )
    ? "interest"
    : "";
}

export function rankCareers(state) {
  const mode = rankingMode(state);

  return [...careerPaths].sort((a, b) =>
    mode === "skills"
      ? skillMatch(b, state.confirmed) -
        skillMatch(a, state.confirmed)
      : mode === "interest"
        ? (interestMatch(b, state) ?? -1) -
          (interestMatch(a, state) ?? -1)
        : 0,
  );
}

export function skillGap(path, confirmed) {
  if (!confirmed.length) return null;

  return {
    matched: path.skills.filter((skill) =>
      confirmed.includes(skill),
    ),
    missing: path.skills.filter(
      (skill) => !confirmed.includes(skill),
    ),
  };
}
