import { allSkills } from "../../careers/services/careerCatalog.js";

export const sampleSkills = [
  { name: "HTML", source: "Technical Skills" },
  { name: "CSS", source: "Technical Skills" },
  { name: "JavaScript", source: "Projects" },
  { name: "React", source: "Projects" },
  { name: "Python", source: "Technical Skills" },
  { name: "SQL", source: "Experience" },
];

// This prepares illustrative results only. No file content is read or sent to a server.
export function mergeCandidates(existing, additions) {
  return [
    ...new Map(
      [...existing, ...additions].map((skill) => [
        skill.name.toLowerCase(),
        skill,
      ]),
    ).values(),
  ];
}
export function canonicalSkill(name) {
  return (
    allSkills.find(
      (skill) => skill.toLowerCase() === name.trim().toLowerCase(),
    ) || name.trim()
  );
}
export function prepareConcepts(text) {
  const parts = text
    .split(/[,،;\n]/)
    .map((value) => value.trim())
    .filter(Boolean);
  return [...new Set(parts.map(canonicalSkill))].slice(0, 30);
}
