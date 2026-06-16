#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const skillDir = process.argv[2];

if (!skillDir) {
  console.error("Usage: node scripts/validate-skill.mjs <skill-directory>");
  process.exit(1);
}

const skillPath = path.resolve(skillDir);
const skillMd = path.join(skillPath, "SKILL.md");

if (!fs.existsSync(skillMd)) {
  console.error("SKILL.md not found");
  process.exit(1);
}

const content = fs.readFileSync(skillMd, "utf8");
const match = content.match(/^---\n([\s\S]*?)\n---/);

if (!match) {
  console.error("Invalid or missing YAML frontmatter");
  process.exit(1);
}

const frontmatter = Object.fromEntries(
  match[1]
    .split("\n")
    .filter((line) => line.trim() && !line.trim().startsWith("#"))
    .map((line) => {
      const index = line.indexOf(":");
      if (index === -1) return [line.trim(), ""];
      return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
    }),
);

const allowed = new Set(["name", "description"]);
const unexpected = Object.keys(frontmatter).filter((key) => !allowed.has(key));

if (unexpected.length) {
  console.error(`Unexpected frontmatter keys: ${unexpected.join(", ")}`);
  process.exit(1);
}

if (frontmatter.name !== "frontend-tech-design-doc") {
  console.error("Invalid skill name");
  process.exit(1);
}

if (!frontmatter.description) {
  console.error("Missing description");
  process.exit(1);
}

if (/[<>]/.test(frontmatter.description)) {
  console.error("Description cannot contain angle brackets");
  process.exit(1);
}

if (frontmatter.description.length > 1024) {
  console.error("Description is longer than 1024 characters");
  process.exit(1);
}

console.log("Skill is valid!");
