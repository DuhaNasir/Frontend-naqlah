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
  web: 1,
  "data-science": 5,
  database: 4,
  devops: 3,
  security: 3,
  "data-engineering": 4,
  blockchain: 0,
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
  assert.equal(questionnaireComplete({ web: 5 }), false);
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
