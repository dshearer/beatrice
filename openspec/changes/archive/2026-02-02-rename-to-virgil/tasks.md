## 1. File Rename

- [x] 1.1 Rename `agents/dante.agent.md` to `agents/virgil.agent.md`

## 2. Package Configuration

- [x] 2.1 Replace all "dante"/"Dante" with "virgil"/"Virgil" in `package.json` (name, displayName, publisher, command IDs, tool names)
- [x] 2.2 Run `npm install` to regenerate `package-lock.json` with updated name

## 3. Source Code

- [x] 3.1 Update `src/extension.ts` — replace log prefixes from "[Dante]" to "[Virgil]"
- [x] 3.2 Update `src/tools.ts` — rename tool registrations (`dante_openFile` → `virgil_openFile`, etc.), status bar messages, and log prefixes
- [x] 3.3 Update `src/agent.ts` — rename agent filename constant, command ID (`dante.installAgent` → `virgil.installAgent`), and user-facing messages

## 4. Agent Definition

- [x] 4.1 Update `agents/virgil.agent.md` — YAML frontmatter name, tool references (`dante.dante/` → `virgil.virgil/`), and all body text references

## 5. Documentation

- [x] 5.1 Update `README.md` — all references to Dante/dante
- [x] 5.2 Update `openspec/specs/copilot-tour-agent/spec.md` — "Dante agent" reference

## 6. Verification

- [x] 6.1 Run `npm run compile` and confirm no build errors
- [x] 6.2 Grep for remaining "dante" references (excluding archive directory) and confirm none exist
