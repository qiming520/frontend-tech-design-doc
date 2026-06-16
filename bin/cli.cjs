#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const packageRoot = path.resolve(__dirname, "..");
const skillName = "frontend-tech-design-doc";
const sourceSkillDir = path.join(packageRoot, "skills", skillName);

function usage() {
  console.log(`frontend-tech-design-doc-skill

Usage:
  frontend-tech-design-doc-skill path
  frontend-tech-design-doc-skill install claude
  frontend-tech-design-doc-skill install codex
  frontend-tech-design-doc-skill install all
  frontend-tech-design-doc-skill install claude --project <project-root>

Commands:
  path                 Print the packaged skill directory.
  install claude       Install to ~/.claude/skills/frontend-tech-design-doc.
  install codex        Install to \${CODEX_HOME:-~/.codex}/skills/frontend-tech-design-doc.
  install all          Install to both Claude Code and Codex user skill dirs.
  install claude --project <dir>
                       Install as a project-scoped Claude Code skill under
                       <dir>/.claude/skills/frontend-tech-design-doc.
`);
}

function copyDir(src, dest) {
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(from, to);
    } else if (entry.isSymbolicLink()) {
      fs.symlinkSync(fs.readlinkSync(from), to);
    } else {
      fs.copyFileSync(from, to);
      fs.chmodSync(to, fs.statSync(from).mode);
    }
  }
}

function parseProjectRoot(args) {
  const index = args.indexOf("--project");
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value) {
    console.error("Missing value for --project");
    process.exit(1);
  }
  return path.resolve(value);
}

function claudeUserDir() {
  return path.join(os.homedir(), ".claude", "skills", skillName);
}

function claudeProjectDir(projectRoot) {
  return path.join(projectRoot, ".claude", "skills", skillName);
}

function codexUserDir() {
  const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
  return path.join(codexHome, "skills", skillName);
}

function install(dest) {
  copyDir(sourceSkillDir, dest);
  console.log(`Installed ${skillName} to ${dest}`);
}

const args = process.argv.slice(2);
const command = args[0] || "path";

if (command === "help" || command === "--help" || command === "-h") {
  usage();
  process.exit(0);
}

if (command === "path") {
  console.log(sourceSkillDir);
  process.exit(0);
}

if (command !== "install") {
  usage();
  process.exit(1);
}

const target = args[1];
const projectRoot = parseProjectRoot(args);

if (target === "claude") {
  install(projectRoot ? claudeProjectDir(projectRoot) : claudeUserDir());
} else if (target === "codex") {
  if (projectRoot) {
    console.error("--project is only supported for Claude Code project skills.");
    process.exit(1);
  }
  install(codexUserDir());
} else if (target === "all") {
  if (projectRoot) {
    console.error("--project cannot be combined with install all.");
    process.exit(1);
  }
  install(claudeUserDir());
  install(codexUserDir());
} else {
  usage();
  process.exit(1);
}
