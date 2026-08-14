# Plan: Load `logging.md` via Kilo project config

## Goal
Ensure the Kilo runtime loads `./kilocode/rules/logging.md` as an instruction file in this SvelteKit project, so generated JS/TS code uses the canonical Pino logging standard. The existing `./kilocode/rules/rtk-rules.md` instruction must remain loaded.

## Discoveries
- File to edit: `/workspaces/voyager/voyager/kilo.jsonc` (JSONC with comments).
- Current contents (12 lines):
  - `$schema` pointer to `https://app.kilo.ai/config.json`.
  - `mcp.svelte` block (local Svelte MCP server) — leave untouched.
  - Redundant inline comment `// kilo.jsonc` placed inside the top-level object (valid JSONC, but noisy).
  - `instructions` array with a single entry: `"./kilocode/rules/rtk-rules.md"`.
- `kilo.jsonc` is discovered via the canonical config-file rule (project `./kilo.jsonc`).
- `instructions` is a string array of glob patterns; Kilo merges it with discovered `AGENTS.md`/`CLAUDE.md`/`CONTEXT.md` automatically.
- The rule file already exists at `/workspaces/voyager/voyager/.kilocode/rules/logging.md` (13 KB, Pino logging standard). No source changes needed to the rule file itself.
- `.kilocode/rules/rtk-rules.md` also exists — must stay in the array per user decision.
- No other `kilo.jsonc` exists higher up the tree (only this one in the project).

## Decisions (resolved with user)
1. Keep both instructions; append `logging.md` as a second entry.
2. Remove the redundant inline `// kilo.jsonc` comment while editing.

## File-Level Changes

### 1. `voyager/kilo.jsonc` (modify)
Replace the file with the cleaned-up content that:
- Keeps `$schema`, `mcp.svelte` block (untouched).
- Removes the redundant inline `// kilo.jsonc` comment.
- Replaces `instructions` array with both rules, in the same order they appear today (rtk-rules first, then logging.md appended), preserving the existing rtk-rules entry verbatim.

Final target content:

```jsonc
{
  "$schema": "https://app.kilo.ai/config.json",
  "mcp": {
    "svelte": {
      "type": "local",
      "command": ["npx", "-y", "@sveltejs/mcp"],
      "enabled": true,
    },
  },
  "instructions": ["./kilocode/rules/rtk-rules.md", "./kilocode/rules/logging.md"],
}
```

### 2. No other files change
- `voyager/.kilocode/rules/logging.md` — already present; do not modify.
- `voyager/.kilocode/rules/rtk-rules.md` — already present; do not modify.
- `voyager/.kilocode/.gitignore` — unrelated to this plan; do not modify.
- No source code, package.json, or config outside `kilo.jsonc` is touched.

## Risks & Mitigations
- **JSONC syntax drift.** Removing a comment is safe — JSONC permits comments but doesn't require them. No structural change to keys/values.
- **Path resolution.** `./kilocode/...` is resolved relative to the `kilo.jsonc` file's directory. The rule files already exist there, so the globs resolve immediately.
- **Order of instruction loading.** Kilo concatenates instruction files; order shouldn't change behavior, but we preserve rtk-rules first (existing) and append logging.md, matching the user's "keep both, append" choice.
- **No runtime impact.** `instructions` is consumed by Kilo's prompt assembly, not by SvelteKit/Vite, so `npm run build` and dev server are unaffected.

## Validation Plan
1. Open `voyager/kilo.jsonc` and confirm:
   - `instructions` array contains both entries, in order: `./kilocode/rules/rtk-rules.md`, `./kilocode/rules/logging.md`.
   - No `// kilo.jsonc` inline comment remains.
   - JSONC still parses (no trailing commas, braces balanced).
2. Confirm both rule files exist on disk:
   - `voyager/.kilocode/rules/rtk-rules.md`
   - `voyager/.kilocode/rules/logging.md`
3. (Optional, runtime) Restart the Kilo session and verify that references to the logging standard (e.g. "Use `log` from `logger.js`") appear in the agent's context. Not required for this plan to be considered done.

## Out of Scope
- Editing the `logging.md` or `rtk-rules.md` rule files themselves.
- Creating a `logger.js` for this project (the logging rule instructs generated code to follow the standard; implementing the logger is a separate task that will be triggered the next time backend JS is generated).
- Adjusting `.kilocode/.gitignore`.
- Touching any SvelteKit/Vite/WebLLM source files.