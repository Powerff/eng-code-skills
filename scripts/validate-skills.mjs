#!/usr/bin/env node
/**
 * Validate that every skill under skills/ is self-contained and complete.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');

const REQUIRED_FILES = ['skill.json', 'prompt.md', 'SKILL.md'];
const REQUIRED_DIRS = ['examples'];

const EXPECTED = [
  // general
  'code-style-check',
  'code-refactor',
  'tech-debt-scan',
  'code-review',
  // backend analysis
  'backend-code-style-check',
  'backend-code-refactor',
  'backend-tech-debt-scan',
  'backend-code-review',
  // backend workflows (from Cursor tech skills)
  'backend-code-standards',
  'backend-code-optimize',
  'backend-bug-fix',
  'backend-code-commit',
  'backend-implement-verify',
  'backend-implement-verify-commit',
  'backend-implement-verify-restart',
  'backend-project-refactor',
  // frontend
  'frontend-code-style-check',
  'frontend-code-refactor',
  'frontend-tech-debt-scan',
  'frontend-code-review',
  'frontend-project-refactor',
];

/** Skills that must preserve business behavior (analysis / safe optimize). */
const LOGIC_SAFE = new Set([
  'code-style-check',
  'code-refactor',
  'tech-debt-scan',
  'code-review',
  'backend-code-style-check',
  'backend-code-refactor',
  'backend-tech-debt-scan',
  'backend-code-review',
  'backend-code-standards',
  'backend-code-optimize',
  'frontend-code-style-check',
  'frontend-code-refactor',
  'frontend-tech-debt-scan',
  'frontend-code-review',
]);

const COMMON_SNIPPETS = ['风险警告', '人工校验'];
const LOGIC_SAFE_SNIPPETS = [
  '严禁修改业务逻辑',
  '不得改变业务逻辑',
  '行为不变',
];

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exitCode = 1;
}

function hasAny(text, snippets) {
  return snippets.some((s) => text.includes(s));
}

function main() {
  const listOnly = process.argv.includes('--list');
  if (!fs.existsSync(SKILLS_DIR)) {
    fail('skills/ directory missing');
    return;
  }

  const entries = fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  if (listOnly) {
    for (const name of entries) console.log(name);
    console.log(`\nTotal: ${entries.length}`);
    return;
  }

  for (const name of EXPECTED) {
    if (!entries.includes(name)) fail(`missing expected skill: ${name}`);
  }

  for (const name of entries) {
    if (!EXPECTED.includes(name)) {
      console.warn(`WARN: unexpected skill folder: ${name}`);
    }

    const dir = path.join(SKILLS_DIR, name);
    for (const f of REQUIRED_FILES) {
      const p = path.join(dir, f);
      if (!fs.existsSync(p)) fail(`${name}: missing ${f}`);
    }
    for (const d of REQUIRED_DIRS) {
      const p = path.join(dir, d);
      if (!fs.existsSync(p) || !fs.statSync(p).isDirectory()) {
        fail(`${name}: missing ${d}/`);
      }
    }

    const examples = fs.readdirSync(path.join(dir, 'examples'));
    if (examples.length === 0) fail(`${name}: examples/ is empty`);
    for (const requiredExample of ['basic.md', 'basic.zh-CN.md']) {
      if (!examples.includes(requiredExample)) {
        fail(`${name}: missing examples/${requiredExample}`);
      }
    }

    let meta;
    try {
      meta = JSON.parse(fs.readFileSync(path.join(dir, 'skill.json'), 'utf8'));
    } catch (e) {
      fail(`${name}: skill.json invalid JSON: ${e.message}`);
      continue;
    }

    if (meta.name !== name) fail(`${name}: skill.json name mismatch (${meta.name})`);
    if (!meta.description) fail(`${name}: skill.json missing description`);
    if (!meta.inputSchema || !meta.outputSchema) {
      fail(`${name}: skill.json missing inputSchema/outputSchema`);
    }

    const skillMd = fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8');
    if (!skillMd.startsWith('---')) fail(`${name}: SKILL.md missing YAML frontmatter`);
    if (!skillMd.includes(`name: ${name}`)) {
      fail(`${name}: SKILL.md frontmatter name mismatch`);
    }

    const prompt = fs.readFileSync(path.join(dir, 'prompt.md'), 'utf8');
    for (const snip of COMMON_SNIPPETS) {
      if (!prompt.includes(snip)) fail(`${name}: prompt.md missing mandatory snippet: ${snip}`);
      if (!skillMd.includes(snip)) fail(`${name}: SKILL.md missing mandatory snippet: ${snip}`);
    }

    if (LOGIC_SAFE.has(name)) {
      if (!hasAny(prompt, LOGIC_SAFE_SNIPPETS)) {
        fail(
          `${name}: prompt.md missing logic-safe constraint (${LOGIC_SAFE_SNIPPETS.join(' | ')})`,
        );
      }
      if (!hasAny(skillMd, LOGIC_SAFE_SNIPPETS)) {
        fail(
          `${name}: SKILL.md missing logic-safe constraint (${LOGIC_SAFE_SNIPPETS.join(' | ')})`,
        );
      }
    }

    // Independence: prompts must not reference sibling skills by relative path
    if (/skills\/[a-z0-9-]+\//.test(prompt) || /\.\.\/[a-z]/.test(prompt)) {
      fail(`${name}: prompt.md appears to reference external skill paths`);
    }

    console.log(`OK  ${name}`);
  }

  if (!process.exitCode) {
    console.log(`\nAll ${entries.length} skills validated.`);
  }
}

main();
