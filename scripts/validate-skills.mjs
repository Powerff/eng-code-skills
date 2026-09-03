#!/usr/bin/env node
/**
 * Validate that every skill under skills/ is self-contained and complete.
 *
 * Flags:
 *   --list       Print skill folder names
 *   --json       Machine-readable summary (implies full validate)
 *   --strict     Treat unexpected skill folders as failures
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
  'backend-api-layer-check',
  // backend workflows (from Cursor tech skills)
  'backend-code-standards',
  'backend-code-optimize',
  'backend-bug-fix',
  'backend-code-commit',
  'backend-implement-verify',
  'backend-implement-verify-commit',
  'backend-implement-verify-restart',
  'backend-project-refactor',
  'backend-stack-upgrade',
  // greenfield (graph + loop engineering)
  'graph-engineering-requirements',
  'iteration-plan',
  'plan-to-ship',
  'loop-engineering-slice',
  'greenfield-graph-loop',
  'greenfield-graph-loop-commit',
  // frontend
  'frontend-code-style-check',
  'frontend-code-refactor',
  'frontend-tech-debt-scan',
  'frontend-code-review',
  'frontend-hooks-check',
  'frontend-component-audit',
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
  'backend-api-layer-check',
  'backend-code-standards',
  'backend-code-optimize',
  'frontend-code-style-check',
  'frontend-code-refactor',
  'frontend-tech-debt-scan',
  'frontend-code-review',
  'frontend-hooks-check',
  'frontend-component-audit',
]);

const COMMON_SNIPPETS = ['风险警告', '人工校验'];
const LOGIC_SAFE_SNIPPETS = [
  '严禁修改业务逻辑',
  '不得改变业务逻辑',
  '行为不变',
];

/** Hosts / runtimes every skill must declare (mainstream LLM tooling). */
const REQUIRED_COMPATIBILITY = [
  'agentskills.io',
  'Cursor',
  'Claude Code',
  'ChatGPT',
  'GitHub Copilot',
  'Gemini',
  'Continue',
  'Cline',
  'Roo Code',
  'Windsurf',
  'Trae',
  'manual-prompt',
];

/** Model families every skill must declare. */
const REQUIRED_MODEL_FAMILIES = [
  'OpenAI GPT',
  'Anthropic Claude',
  'Google Gemini',
  'DeepSeek',
  'Qwen',
  'Moonshot Kimi',
  'xAI Grok',
  'other tool-using coding LLMs',
];

const CATEGORY_PREFIX = {
  general: (n) => !n.startsWith('backend-') && !n.startsWith('frontend-'),
  backend: (n) => n.startsWith('backend-'),
  frontend: (n) => n.startsWith('frontend-'),
};

function fail(msg, errors) {
  console.error(`FAIL: ${msg}`);
  errors.push(msg);
  process.exitCode = 1;
}

function hasAny(text, snippets) {
  return snippets.some((s) => text.includes(s));
}

function categorize(name) {
  if (CATEGORY_PREFIX.backend(name)) return 'backend';
  if (CATEGORY_PREFIX.frontend(name)) return 'frontend';
  return 'general';
}

function main() {
  const listOnly = process.argv.includes('--list');
  const asJson = process.argv.includes('--json');
  const strict = process.argv.includes('--strict');
  const errors = [];
  const warnings = [];
  const ok = [];

  if (!fs.existsSync(SKILLS_DIR)) {
    fail('skills/ directory missing', errors);
    if (asJson) {
      console.log(JSON.stringify({ ok: false, errors, warnings, skills: [] }, null, 2));
    }
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
    if (!entries.includes(name)) fail(`missing expected skill: ${name}`, errors);
  }

  for (const name of entries) {
    if (!EXPECTED.includes(name)) {
      const msg = `unexpected skill folder: ${name}`;
      if (strict) fail(msg, errors);
      else {
        console.warn(`WARN: ${msg}`);
        warnings.push(msg);
      }
    }

    const dir = path.join(SKILLS_DIR, name);
    for (const f of REQUIRED_FILES) {
      const p = path.join(dir, f);
      if (!fs.existsSync(p)) fail(`${name}: missing ${f}`, errors);
    }
    for (const d of REQUIRED_DIRS) {
      const p = path.join(dir, d);
      if (!fs.existsSync(p) || !fs.statSync(p).isDirectory()) {
        fail(`${name}: missing ${d}/`, errors);
      }
    }

    const examplesDir = path.join(dir, 'examples');
    if (fs.existsSync(examplesDir)) {
      const examples = fs.readdirSync(examplesDir);
      if (examples.length === 0) fail(`${name}: examples/ is empty`, errors);
      for (const requiredExample of ['basic.md', 'basic.zh-CN.md']) {
        if (!examples.includes(requiredExample)) {
          fail(`${name}: missing examples/${requiredExample}`, errors);
        }
      }
    }

    let meta;
    try {
      meta = JSON.parse(fs.readFileSync(path.join(dir, 'skill.json'), 'utf8'));
    } catch (e) {
      fail(`${name}: skill.json invalid JSON: ${e.message}`, errors);
      continue;
    }

    if (meta.name !== name) fail(`${name}: skill.json name mismatch (${meta.name})`, errors);
    if (!meta.description) fail(`${name}: skill.json missing description`, errors);
    if (!meta.version) fail(`${name}: skill.json missing version`, errors);
    if (!meta.category) fail(`${name}: skill.json missing category`, errors);
    if (!meta.inputSchema || !meta.outputSchema) {
      fail(`${name}: skill.json missing inputSchema/outputSchema`, errors);
    }
    if (!Array.isArray(meta.compatibility) || meta.compatibility.length === 0) {
      fail(`${name}: skill.json missing compatibility[]`, errors);
    } else {
      for (const host of REQUIRED_COMPATIBILITY) {
        if (!meta.compatibility.includes(host)) {
          fail(`${name}: skill.json compatibility missing host: ${host}`, errors);
        }
      }
    }
    if (!Array.isArray(meta.modelFamilies) || meta.modelFamilies.length === 0) {
      fail(`${name}: skill.json missing modelFamilies[]`, errors);
    } else {
      for (const family of REQUIRED_MODEL_FAMILIES) {
        if (!meta.modelFamilies.includes(family)) {
          fail(`${name}: skill.json modelFamilies missing: ${family}`, errors);
        }
      }
    }
    if (!meta.runtimeNotes || typeof meta.runtimeNotes !== 'string') {
      fail(`${name}: skill.json missing runtimeNotes`, errors);
    }
    // Common mandatory outputs across analysis + workflow skills
    for (const key of ['summary', 'riskWarnings', 'manualChecks']) {
      if (!meta.outputSchema?.properties?.[key]) {
        fail(`${name}: skill.json outputSchema missing ${key}`, errors);
      }
    }

    const skillMdPath = path.join(dir, 'SKILL.md');
    const promptPath = path.join(dir, 'prompt.md');
    if (!fs.existsSync(skillMdPath) || !fs.existsSync(promptPath)) continue;

    const skillMd = fs.readFileSync(skillMdPath, 'utf8');
    if (!skillMd.startsWith('---')) fail(`${name}: SKILL.md missing YAML frontmatter`, errors);
    if (!skillMd.includes(`name: ${name}`)) {
      fail(`${name}: SKILL.md frontmatter name mismatch`, errors);
    }

    const prompt = fs.readFileSync(promptPath, 'utf8');
    for (const snip of COMMON_SNIPPETS) {
      if (!prompt.includes(snip)) fail(`${name}: prompt.md missing mandatory snippet: ${snip}`, errors);
      if (!skillMd.includes(snip)) fail(`${name}: SKILL.md missing mandatory snippet: ${snip}`, errors);
    }

    if (LOGIC_SAFE.has(name)) {
      if (!hasAny(prompt, LOGIC_SAFE_SNIPPETS)) {
        fail(
          `${name}: prompt.md missing logic-safe constraint (${LOGIC_SAFE_SNIPPETS.join(' | ')})`,
          errors,
        );
      }
      if (!hasAny(skillMd, LOGIC_SAFE_SNIPPETS)) {
        fail(
          `${name}: SKILL.md missing logic-safe constraint (${LOGIC_SAFE_SNIPPETS.join(' | ')})`,
          errors,
        );
      }
    }

    // Independence: prompts must not reference sibling skills by relative path
    if (/skills\/[a-z0-9-]+\//.test(prompt) || /\.\.\/[a-z]/.test(prompt)) {
      fail(`${name}: prompt.md appears to reference external skill paths`, errors);
    }

    const skillFailed = errors.some(
      (e) => e.startsWith(`${name}:`) || e === `missing expected skill: ${name}`,
    );
    if (!skillFailed) {
      ok.push(name);
      if (!asJson) console.log(`OK  ${name}`);
    }
  }

  const byCategory = { general: 0, backend: 0, frontend: 0 };
  for (const name of entries) {
    byCategory[categorize(name)] += 1;
  }

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          ok: !process.exitCode,
          total: entries.length,
          expected: EXPECTED.length,
          byCategory,
          requiredCompatibility: REQUIRED_COMPATIBILITY,
          requiredModelFamilies: REQUIRED_MODEL_FAMILIES,
          skills: entries,
          errors,
          warnings,
        },
        null,
        2,
      ),
    );
    return;
  }

  if (!process.exitCode) {
    console.log(`\nAll ${entries.length} skills validated.`);
    console.log(
      `By category: general=${byCategory.general} backend=${byCategory.backend} frontend=${byCategory.frontend}`,
    );
    console.log(
      `LLM coverage: ${REQUIRED_COMPATIBILITY.length} hosts · ${REQUIRED_MODEL_FAMILIES.length} model families`,
    );
  } else {
    console.error(`\nValidation failed with ${errors.length} error(s).`);
  }
}

main();
