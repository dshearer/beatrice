## 1. VS Code Extension Setup

- [x] 1.1 Initialize VS Code extension project structure with TypeScript
- [x] 1.2 Configure package.json with extension metadata and dependencies
- [x] 1.3 Set up tsconfig.json and build tooling
- [x] 1.4 Create extension activation entry point

## 2. Custom Tool Implementations

- [x] 2.1 Implement openFile tool (opens file at specified line)
- [x] 2.2 Implement highlightLines tool (highlights line range in current file)
- [x] 2.3 Implement navigateToLine tool (scrolls to and centers specific line)
- [x] 2.4 Add tool registration mechanism in extension activation
- [x] 2.5 Implement error handling for tool invocations (file not found, invalid line numbers)

## 3. VS Code Editor Integration

- [x] 3.1 Create file opener utility using vscode.workspace.openTextDocument
- [x] 3.2 Implement line highlighting using vscode.window.showTextDocument with selection
- [x] 3.3 Add viewport scrolling to center highlighted code
- [x] 3.4 Handle file resolution for workspace-relative paths
- [x] 3.5 Add support for multi-root workspaces
- [x] 3.6 Implement visual feedback for tool invocations (status bar, notifications)

## 4. Custom Agent Definition

- [x] 4.1 Create .github/agents directory structure
- [x] 4.2 Write dante.agent.md with YAML frontmatter
- [x] 4.3 Define agent tools in YAML (openFile, highlightLines, navigateToLine)
- [x] 4.4 Write agent prompt with tour guide instructions
- [x] 4.5 Add overview-first pattern to agent prompt
- [x] 4.6 Add user-pacing instructions to agent prompt
- [x] 4.7 Include examples of good tour narratives in agent definition

## 5. Agent Behavior Refinement

- [x] 5.1 Add instructions for step-by-step code explanations
- [x] 5.2 Define transition phrases between tour stops
- [x] 5.3 Add instructions for handling user questions mid-tour
- [x] 5.4 Include guidance for detecting deep-dive requests vs simple questions
- [x] 5.5 Add tour completion and follow-up prompt instructions

## 6. Documentation

- [x] 7.1 Write README with installation and usage instructions
- [x] 7.2 Document how to invoke Dante agent in Copilot chat
- [x] 7.3 Add examples of good questions to ask Dante
- [x] 7.4 Document custom tools and their parameters
- [x] 7.5 Document known limitations and future enhancements
- [x] 7.6 Add architecture diagram showing agent + extension relationship
