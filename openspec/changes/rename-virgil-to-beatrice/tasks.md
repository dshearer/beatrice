## 1. File Rename

- [ ] 1.1 Rename `agents/virgil.agent.md` to `agents/beatrice.agent.md`

## 2. Package Configuration

- [ ] 2.1 Replace all "virgil"/"Virgil" with "beatrice"/"Beatrice" in `package.json` (name, displayName, command IDs, tool names)
- [ ] 2.2 Run `npm install` to regenerate `package-lock.json` with updated name

## 3. Source Code

- [ ] 3.1 Update `src/extension.ts` — replace log prefixes from "[Virgil]" to "[Beatrice]"
- [ ] 3.2 Update `src/tools.ts` — rename tool registrations (`virgil_openFile` → `beatrice_openFile`, etc.), status bar messages, and log prefixes
- [ ] 3.3 Update `src/agent.ts` — rename agent filename constant, command ID (`virgil.installAgent` → `beatrice.installAgent`), and user-facing messages

## 4. Agent Definition

- [ ] 4.1 Update `agents/beatrice.agent.md` — YAML frontmatter name, tool references (`dshearer.virgil/` → `dshearer.beatrice/`), and all body text references

## 5. Documentation

- [ ] 5.1 Update `README.md` — all references to Virgil/virgil
- [ ] 5.2 Update `openspec/specs/copilot-tour-agent/spec.md` — "Virgil agent" reference
- [ ] 5.3 Update `openspec/specs/file-navigation/spec.md` — any Virgil references
- [ ] 5.4 Update `openspec/specs/tour-narration/spec.md` — any Virgil references

## 6. Verification

- [ ] 6.1 Run `npm run compile` and confirm no build errors
- [ ] 6.2 Grep for remaining "virgil" references (excluding archive directory) and confirm none exist
