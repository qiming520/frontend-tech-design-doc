#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectRoot = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const date = process.argv[3] || new Date().toLocaleDateString("en-CA", {
  timeZone: "Asia/Shanghai",
});

const outDir = path.join(projectRoot, "designHtml", date);
fs.mkdirSync(outDir, { recursive: true });

console.log(outDir);
