# frontend-tech-design-doc

用于生成前端技术设计文档的 Agent Skill。它会根据需求链接读取需求内容，结合现有前端项目或 codeGraph 知识图谱做项目分析，按公司 17work 模板输出前端详设文档。

这个仓库不是只给 Codex 用。核心能力写在标准 `SKILL.md` 中，可同时给 Codex 和 Claude Code 使用；`agents/openai.yaml` 只是 Codex 侧的展示元数据，不影响 Claude Code 使用。

模板来源：

https://17work.dc.servyou-it.com/read/book/100/99216

## 适用场景

- 根据 17work、禅道、产品原型、UI 设计稿等需求链接编写前端技术设计文档。
- 需要先分析现有项目结构、路由、页面、组件、接口层、状态管理和相似功能，再给出技术方案。
- 需要优先读取 codeGraph 生成的知识图谱；如果项目没有知识图谱，则直接读取项目代码。
- 需要调用专家 agent 或执行专家审查，补齐风险、影响点、文件改动清单和待确认项。
- 需要同时产出 HTML 和 Markdown，便于归档、评审或上传到其他平台。

## 安装到 Codex

从 GitHub 安装 skill：

```bash
npx -y skills add https://github.com/qiming520/frontend-tech-design-doc.git
```

也可以通过 npm 包安装到 Codex 用户 skill 目录：

```bash
npx frontend-tech-design-doc-skill install codex
```

## 安装到 Claude Code

通过 npm 一键安装到 Claude Code 用户 skill 目录：

```bash
npx frontend-tech-design-doc-skill install claude
```

安装后目录为：

```text
~/.claude/skills/frontend-tech-design-doc/SKILL.md
```

如果只想在某个项目里启用，可以安装为项目级 Claude Code skill：

```bash
npx frontend-tech-design-doc-skill install claude --project /path/to/frontend-project
```

安装后目录为：

```text
/path/to/frontend-project/.claude/skills/frontend-tech-design-doc/SKILL.md
```

## npm 包

```bash
npm i frontend-tech-design-doc-skill
```

查看 npm 包内 skill 路径：

```bash
npx frontend-tech-design-doc-skill path
```

同时安装到 Codex 和 Claude Code：

```bash
npx frontend-tech-design-doc-skill install all
```

## 使用方式

在 Codex 或 Claude Code 中这样提需求即可触发：

```text
使用 frontend-tech-design-doc skill，根据这个需求链接生成前端技术设计文档：
https://17work.dc.servyou-it.com/read/book/xxx/yyy

项目路径：/path/to/frontend-project
```

也可以使用更完整的提示词：

```text
需求地址：<需求链接>
使用 17work 的技能读取需求。根据 codeGraph 生成的知识图谱了解现有项目；
如果项目没有 codeGraph 知识图谱，就直接读取项目代码。
然后读取需求文档，调用专家 agent，完成该需求的前端开发技术设计文档。
文档先以 HTML 格式生成，再生成对应的 Markdown 格式文档。
产物输出到 designHtml/当前日期 文件夹下面。
如果有什么不知道、疑惑、需要获取的信息，一定先问我；
在你觉得已经获取到足够信息的时候，再开始编写设计文档。
文档格式严格按照模板：
https://17work.dc.servyou-it.com/read/book/100/99216
```

## 执行流程

skill 会引导 Agent 按以下顺序执行：

1. 读取 17work 前端详设模板，模板链接作为最新格式来源。
2. 读取需求文档，提取业务背景、技术背景、需求规则、相关链接、接口依赖和验收重点。
3. 分析项目：优先查找 codeGraph / knowledge graph / repo map 等图谱文件；没有图谱时读取源码。
4. 梳理现有目录结构、页面入口、数据链路、复用组件、接口层和潜在改动点。
5. 调用专家 agent 或执行专家审查，检查方案完整性、风险、回归范围和待确认项。
6. 信息不足时先向用户提问；信息足够后再写文档。
7. 先生成 HTML，再基于同一内容生成 Markdown。

## 输出效果

默认输出到目标项目：

```text
designHtml/YYYY-MM-DD/
  <需求标题>-frontend-tech-design.html
  <需求标题>-frontend-tech-design.md
```

文档章节严格跟随 17work 模板：

```text
1：概述
1.1 相关文档
1.2 需求概述
2. 需求规则
3. 现有项目分析
4.技术方案
5.API 清单
6.文件改动清单
7.影响点
8.风险与待确认
```

生成结果会尽量包含：

- 需求相关文档链接。
- 业务背景和技术背景。
- 需求规则拆解。
- 项目目录结构和数据链路。
- 模块级技术方案、流程设计、数据模型和注意事项。
- API 清单及 Walle 地址。
- 文件新增、修改、删除清单。
- 测试回归重点。
- 风险、应对方案和待确认问题。

## 内部依赖

读取 17work 模板和需求时，推荐配合公司内部 17work skills：

```bash
npx -y skills add https\://gitlab.dc.servyou-it.com/AGI/open-skills/17work-skills.git
```

如果 17work skill 或 CLI 不可用，本仓库内置了模板备份：

```text
skills/frontend-tech-design-doc/references/template.md
```

远端模板可读取时，以 17work 链接内容为准。

## 项目结构

```text
skills/frontend-tech-design-doc/
  SKILL.md
  agents/openai.yaml
  references/template.md
  references/expert-agent.md
  scripts/create-output-dir.mjs
```

## 开发校验

```bash
npm run validate:skill
npm run pack:dry-run
```
