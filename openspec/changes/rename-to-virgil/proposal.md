## Why

The project is currently named "Dante" but should be renamed to "Virgil" to better reflect the intended branding. This is a full rebrand affecting all user-facing names, internal identifiers, and tool registrations.

## What Changes

- **BREAKING**: Rename all VS Code tool IDs (`dante_openFile` → `virgil_openFile`, `dante_highlightLines` → `virgil_highlightLines`, `dante_navigateToLine` → `virgil_navigateToLine`)
- **BREAKING**: Rename VS Code command IDs (`dante.installAgent` → `virgil.installAgent`)
- **BREAKING**: Rename agent file (`dante.agent.md` → `virgil.agent.md`) and update all internal tool references (`dante.dante/` → `virgil.virgil/`)
- Rename package name, displayName, and publisher in `package.json`
- Update all user-facing strings (status bar messages, error messages, log prefixes)
- Update README and spec documentation

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `copilot-tour-agent`: Agent file renamed from `dante.agent.md` to `virgil.agent.md`; agent identity changes from "Dante" to "Virgil"; tool namespace changes from `dante.dante/` to `virgil.virgil/`
- `file-navigation`: Tool IDs change from `dante_*` prefix to `virgil_*` prefix
- `tour-narration`: Agent persona name changes from "Dante" to "Virgil" in all narration

## Impact

- **Source code**: `src/extension.ts`, `src/tools.ts`, `src/agent.ts` — log prefixes, tool registrations, command IDs, status bar messages
- **Configuration**: `package.json`, `package-lock.json` — package identity, VS Code contribution points
- **Agent**: `agents/dante.agent.md` → `agents/virgil.agent.md` — file rename plus content updates
- **Documentation**: `README.md`, spec files
- **Users**: Anyone referencing `@dante` in Copilot chat must use `@virgil` instead
