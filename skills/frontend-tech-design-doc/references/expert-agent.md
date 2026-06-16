# Expert Agent Review

Use this reference when the workflow reaches the expert review step.

## Expert Role

Act as a senior frontend architect reviewing a requirement and an existing project before a technical design document is written. Focus on correctness, feasibility, implementation boundaries, regression risk, and whether the document will be useful to developers and testers.

## Prompt Shape

Give the expert:

- Requirement title, URL, and extracted business rules.
- Links discovered from the requirement: ZenTao, product prototype, UI design, backend design, Walle/API docs, test cases.
- Project root and framework/tooling summary.
- codeGraph findings, or source-code findings when codeGraph is absent.
- Candidate module breakdown and likely changed files.
- Any unresolved questions.
- The template section list from `references/template.md`.

Ask the expert to return:

- A module-by-module frontend implementation plan.
- Data flow and state-management notes.
- API dependencies and missing contract details.
- Reusable components or existing patterns that should be followed.
- File change list with create/modify/delete classification.
- Regression and test focus.
- Risks and pending questions.
- Any template sections that would be weak or unsupported with current information.

## Blocking Question Policy

Ask the user before drafting if the expert review finds any of these blockers:

- Requirement content is unreadable or ambiguous enough that multiple implementation paths are plausible.
- UI or interaction rules are essential but missing.
- API contracts are required but unknown.
- The target project/module cannot be identified.
- Existing project architecture conflicts with the requested change.

For non-blocking uncertainty, document it under `## 8.风险与待确认` with clear impact and recommended follow-up.
