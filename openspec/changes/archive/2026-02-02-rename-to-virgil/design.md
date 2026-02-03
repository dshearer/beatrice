## Context

The project is currently branded as "Dante" across all layers: package identity, VS Code extension metadata, tool registrations, agent definition, and documentation. A rename to "Virgil" requires a coordinated change across all these layers to maintain consistency.

## Goals / Non-Goals

**Goals:**
- Rename every occurrence of "dante"/"Dante" to "virgil"/"Virgil" in active project files
- Ensure the extension compiles and registers correctly under the new name
- Preserve all functionality — this is a pure rename with no behavioral changes

**Non-Goals:**
- Renaming the git repository or directory on disk (that's up to the user)
- Modifying archived change files (they are historical records)
- Publishing to VS Code marketplace under the new name

## Decisions

**Atomic find-and-replace approach**: Perform case-sensitive replacements (`dante` → `virgil`, `Dante` → `Virgil`) across all active source files, config, agent definition, and docs. This is simpler and less error-prone than file-by-file manual edits.

- Alternative: Scripted `sed` replacement — rejected because some occurrences need contextual awareness (e.g., `dante.dante/openFile` becomes `virgil.virgil/openFile`, not a simple single-token replace).

**File rename**: `agents/dante.agent.md` → `agents/virgil.agent.md`. Only one file needs renaming; all other paths stay the same.

**Archive exclusion**: Files under `openspec/changes/archive/` are left untouched since they represent historical records of past changes.

## Risks / Trade-offs

- **Breaking change for existing users**: Anyone using `@dante` in Copilot chat or referencing `dante_*` tool IDs will need to update. → Acceptable since this is pre-release.
- **Missed occurrences**: A grep-based sweep after changes will catch any remaining references. → Run verification grep as final step.
