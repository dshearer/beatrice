## Why

Understanding unfamiliar codebases is time-consuming and frustrating. Reading docs doesn't show actual implementation; searching files lacks narrative flow. Developers need the experience of a coworker walking them through code - showing relevant files, explaining connections, and answering questions in context - but that doesn't scale.

## What Changes

- Add a VS Code extension called "Dante" that provides guided code tours
- Implement a custom GitHub Copilot agent that responds to questions by opening files and highlighting code
- Create a chat-based interaction where the agent explains code in narrative form while navigating the editor
- Support step-by-step tours with user-controlled pacing

## Capabilities

### New Capabilities
- `copilot-tour-agent`: GitHub Copilot agent that orchestrates code tours
- `file-navigation`: Programmatic control of VS Code editor to open files and highlight lines
- `tour-narration`: Chat-based narrative explanations synchronized with code navigation
- `tour-flow-control`: User-controlled pacing through tour steps with pause/continue/branch

### Modified Capabilities
<!-- No existing capabilities being modified -->

## Impact

- New VS Code extension with dependency on GitHub Copilot API
- Requires VS Code extension APIs for editor control and chat integration
- No impact on existing code or systems (greenfield project)
