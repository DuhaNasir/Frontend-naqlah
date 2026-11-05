import test from "node:test";
import assert from "node:assert/strict";
import { careerPaths } from "../src/pages/careers/services/careerCatalog.js";
import {
  interestMatch,
  questionnaireComplete,
  rankCareers,
  skillGap,
  skillMatch,
} from "../src/pages/careers/services/careerMatching.js";
import {
  prerequisite,
  roadmapStages,
} from "../src/pages/roadmap/services/roadmapService.js";

const state = () => ({
  confirmed: [],
  covered: [],
  interests: {},
  interestSubmitted: false,
  path: "web",
  started: true,
  completed: {},
});
const answers = {
  "web-1": 1,
  "web-2": 1,

  "data-science-1": 5,
  "data-science-2": 5,

  "database-1": 4,
  "database-2": 4,

  "devops-1": 3,
  "devops-2": 3,

  "security-1": 3,
  "security-2": 3,

  "data-engineering-1": 4,
  "data-engineering-2": 4,

  "blockchain-1": 0,
  "blockchain-2": 0,
};

test("confirmed skills take precedence even when another career has greater interest match", () => {
  const current = {
    ...state(),
    confirmed: ["React", "JavaScript"],
    interests: answers,
    interestSubmitted: true,
  };
  assert.equal(rankCareers(current)[0].id, "web");
  assert.equal(skillMatch(careerPaths[0], current.confirmed), 33);
  assert.equal(interestMatch(careerPaths[1], current), 100);
});
test("course-only concepts do not create skill scores or a computed gap", () => {
  const current = {
    ...state(),
    covered: ["React", "JavaScript"],
    interests: answers,
    interestSubmitted: true,
  };
  assert.equal(rankCareers(current)[0].id, "data-science");
  assert.equal(skillMatch(careerPaths[0], current.confirmed), null);
  assert.equal(skillGap(careerPaths[0], current.confirmed), null);
});
test("all questions are required; unknown answers are excluded rather than scored zero", () => {
assert.equal(questionnaireComplete({ "web-1": 5 }), false);
  assert.equal(questionnaireComplete(answers), true);
  assert.equal(
    interestMatch(careerPaths[6], {
      ...state(),
      interests: answers,
      interestSubmitted: true,
    }),
    null,
  );
  assert.equal(
    interestMatch(careerPaths[0], {
      ...state(),
      interests: answers,
      interestSubmitted: true,
    }),
    0,
  );
  assert.equal(
    interestMatch(careerPaths[1], { ...state(), interests: answers }),
    null,
  );
});
test("review candidates and duplicate skills cannot inflate a confirmed match", () => {
  assert.equal(skillMatch(careerPaths[0], ["React", "React"]), 17);
  assert.deepEqual(skillGap(careerPaths[0], ["React"]).matched, ["React"]);
});
test("path changes preserve completion records and shared completed prerequisites", () => {
  const completed = {
    "concept:Git": {
      title: "Git",
      pathName: "تطوير البرمجيات والويب",
      skills: ["Git"],
    },
  };
  const current = { ...state(), path: "devops", completed };
  roadmapStages(current);
  assert.equal(current.completed, completed);
  assert.equal(current.completed["concept:Git"].title, "Git");
  assert.equal(
    prerequisite("concept:Docker", {
      ...current,
      completed: { ...completed, "concept:Linux": { title: "Linux" } },
    }),
    undefined,
  );
});
test("synthetic web student has expected skill match and gap", () => {
  const confirmed = ["React", "JavaScript"];

  assert.equal(skillMatch(careerPaths[0], confirmed), 33);

  const gap = skillGap(careerPaths[0], confirmed);

  assert.deepEqual(gap.matched, ["JavaScript", "React"]);
  assert.deepEqual(gap.missing, [
    "HTML",
    "CSS",
    "Git",
    "REST APIs",
  ]);
});
test("synthetic student has expected interest match scores", () => {
  const current = {
    ...state(),
    interests: answers,
    interestSubmitted: true,
  };

  assert.equal(interestMatch(careerPaths[0], current), 0);
  assert.equal(interestMatch(careerPaths[1], current), 100);
  assert.equal(interestMatch(careerPaths[2], current), 75);
});
test("unknown answer is excluded from interest average", () => {
  const current = {
    ...state(),
    interests: {
      ...answers,
      "web-1": 5,
      "web-2": 0,
    },
    interestSubmitted: true,
  };

  assert.equal(interestMatch(careerPaths[0], current), 100);
});
test("student without confirmed skills is ranked by interest", () => {
  const current = {
    ...state(),
    confirmed: [],
    interests: answers,
    interestSubmitted: true,
  };

  assert.equal(skillMatch(careerPaths[0], current.confirmed), null);
  assert.equal(skillGap(careerPaths[0], current.confirmed), null);
  assert.equal(rankCareers(current)[0].id, "data-science");
});
test("shared skill contributes to every relevant career", () => {
  const confirmed = ["SQL"];

  assert.equal(skillMatch(careerPaths[1], confirmed), 17);
  assert.equal(skillMatch(careerPaths[2], confirmed), 17);

  assert.deepEqual(skillGap(careerPaths[1], confirmed).matched, ["SQL"]);
  assert.deepEqual(skillGap(careerPaths[2], confirmed).matched, ["SQL"]);
});
test("student with all required skills has full match and no gap", () => {
  const confirmed = [...careerPaths[0].skills];

  assert.equal(skillMatch(careerPaths[0], confirmed), 100);

  const gap = skillGap(careerPaths[0], confirmed);

  assert.deepEqual(gap.matched, careerPaths[0].skills);
  assert.deepEqual(gap.missing, []);
});
