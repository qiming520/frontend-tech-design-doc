---
name: frontend-tech-design-doc
description: Generate frontend technical design documents for business requirements. Use when the user asks to write, draft, create, or update a frontend technical design document, front-end detailed design, 前端技术设计文档, 前端详设, 前端开发方案, or a designHtml output from a 17work, ZenTao, or product requirement link; especially when the document must follow the 17work template at https://17work.dc.servyou-it.com/read/book/100/99216, analyze codeGraph knowledge graphs or project source code, call an expert agent, and output HTML plus Markdown under designHtml/YYYY-MM-DD.
---

# Frontend Technical Design Document

Use this skill to produce a frontend technical design document from a requirement link and an existing frontend project. The required output is an HTML document first, then a corresponding Markdown document, both saved under `designHtml/<YYYY-MM-DD>/`.

## Required Inputs

Before writing the document, confirm or discover:

- Requirement URL or document identifier.
- Project root path.
- Whether codeGraph knowledge graph artifacts exist.
- Any UI design, Walle/API, backend design, test case, or owner links mentioned by the requirement.

If the requirement cannot be read, the project root is unclear, the template cannot be obtained, or a design decision would materially change implementation scope, ask the user before drafting. Do not invent missing business rules, API contracts, owner names, dates, or links.

## Workflow

1. Read the latest 17work template.
   - First try the source of truth:
     `npx -y --registry=http://npm.dc.servyou-it.com @servyou-ai/17work-cli@latest docs find 99216`
   - If the 17work skill or CLI is unavailable, install the internal skills first:
     `npx -y skills add https\://gitlab.dc.servyou-it.com/AGI/open-skills/17work-skills.git`
   - If the remote template is temporarily unavailable, read `references/template.md` and clearly state that the bundled template was used.

2. Read the requirement document.
   - For 17work links, use the installed 17work skill or:
     `npx -y --registry=http://npm.dc.servyou-it.com @servyou-ai/17work-cli@latest docs find <postsId>`
   - For ZenTao, Walle, Baymax, or other internal links, use the matching installed skill when available.
   - Extract business background, technical background, rules, links, UI/API dependencies, edge cases, and acceptance/test implications.

3. Analyze the existing project.
   - Prefer codeGraph knowledge graph artifacts when present. Search with:
     `rg --files | rg -i 'codegraph|code-graph|knowledge|graph|repo-map|architecture|dependency'`
   - If no useful codeGraph artifact exists, inspect source code directly. Start with package metadata, route/page structure, service/API layers, shared components, state management, constants, permissions, and existing similar features.
   - Keep notes on directory structure, data flow, reusable modules, likely changed files, and regression areas.

4. Call an expert agent.
   - Read `references/expert-agent.md`.
   - If multi-agent tools are available, send the expert the requirement summary, project/codeGraph notes, template constraints, and unresolved questions.
   - If multi-agent tools are unavailable, perform a separate expert review pass yourself using the same checklist.
   - Reconcile expert feedback before drafting. Ask the user any blocking questions that remain.

5. Draft only after enough information is available.
   - Follow the section order and headings in the template exactly.
   - Use the template tables and subsections; remove placeholder rows only when real content replaces them.
   - Keep unknown but non-blocking items in `## 8.风险与待确认`.
   - Include concrete file paths, module names, data models, API names, and regression scenarios where the project analysis supports them.

6. Generate HTML first, then Markdown.
   - Create the output directory with `scripts/create-output-dir.mjs` or an equivalent command.
   - Save files under `<project-root>/designHtml/<YYYY-MM-DD>/`.
   - Generate HTML as the primary artifact. Use semantic headings/tables and modest embedded CSS, but do not add content sections outside the template.
   - Generate the corresponding Markdown from the same content so it can be pasted into other platforms.

## Output Rules

- Output directory: `<project-root>/designHtml/<YYYY-MM-DD>/`.
- Recommended filenames:
  - `<sanitized-requirement-title>-frontend-tech-design.html`
  - `<sanitized-requirement-title>-frontend-tech-design.md`
- Use the local date from `date +%F`.
- The Markdown document must preserve the template heading text:
  - `## 1：概述`
  - `### 1.1 相关文档`
  - `### 1.2 需求概述`
  - `## 2. 需求规则`
  - `## 3. 现有项目分析`
  - `## 4.技术方案`
  - `## 5.API 清单`
  - `## 6.文件改动清单`
  - `## 7.影响点`
  - `## 8.风险与待确认`
- The HTML document must use the same heading text and order.
- Do not publish or upload generated documents to 17work unless the user explicitly asks and confirms the target book/document.

## Quality Checklist

Before final response:

- Confirm the template was read from 17work or the bundled fallback.
- Confirm requirement content was read and summarized.
- Confirm codeGraph was checked, or source code was inspected as fallback.
- Confirm expert agent/review was completed.
- Confirm HTML and Markdown files exist in `designHtml/<YYYY-MM-DD>/`.
- Check that API, file-change, impact, risk, and pending-question tables are not left as meaningless placeholder rows.
- Report generated file paths to the user.
