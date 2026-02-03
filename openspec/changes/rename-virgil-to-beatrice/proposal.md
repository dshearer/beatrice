## Why

The project is currently named "Virgil" but should be renamed to "Beatrice" to reflect new branding. This is a full rebrand affecting all user-facing names, internal identifiers, and tool registrations.

## What Changes

- **BREAKING**: Rename all VS Code tool IDs (`virgil_openFile` → `beatrice_openFile`, `virgil_highlightLines` → `beatrice_highlightLines`, `virgil_navigateToLine` → `beatrice_navigateToLine`)
- **BREAKING**: Rename VS Code command IDs (`virgil.installAgent` → `beatrice.installAgent`)
- **BREAKING**: Rename agent file (`virgil.agent.md` → `beatrice.agent.md`) and update all internal tool references (`dshearer.virgil/` → `dshearer.beatrice/`)
- Rename package name and displayName in `package.json`
- Update all user-facing strings (status bar messages, error messages, log prefixes)
- Update README and spec documentation

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `copilot-tour-agent`: Agent file renamed from `virgil.agent.md` to `beatrice.agent.md`; agent identity changes from "Virgil" to "Beatrice"; tool namespace changes from `dshearer.virgil/` to `dshearer.beatrice/`
- `file-navigation`: Tool IDs change from `virgil_*` prefix to `beatrice_*` prefix
- `tour-narration`: Agent persona name changes from "Virgil" to "Beatrice" in all narration

## Impact

- **Source code**: `src/extension.ts`, `src/tools.ts`, `src/agent.ts` — log prefixes, tool registrations, command IDs, status bar messages
- **Configuration**: `package.json`, `package-lock.json` — package identity, VS Code contribution points
- **Agent**: `agents/virgil.agent.md` → `agents/beatrice.agent.md` — file rename plus content updates
- **Documentation**: `README.md`, spec files
- **Users**: Anyone referencing `@virgil` in Copilot chat must use `@beatrice` instead
