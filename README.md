# frontend-tech-design-doc

Codex skill for generating frontend technical design documents from requirement links.

The skill follows the 17work template at:

https://17work.dc.servyou-it.com/read/book/100/99216

## Install From Git

```bash
npx -y skills add https://github.com/qiming520/frontend-tech-design-doc.git
```

## Package Contents

```text
skills/frontend-tech-design-doc/
  SKILL.md
  agents/openai.yaml
  references/template.md
  references/expert-agent.md
  scripts/create-output-dir.mjs
```

## Validate

```bash
npm run validate:skill
npm run pack:dry-run
```
