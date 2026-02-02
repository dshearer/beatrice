## 1. VS Code Extension Setup

- [ ] 1.1 Initialize VS Code extension project structure with TypeScript
- [ ] 1.2 Configure package.json with extension metadata and dependencies
- [ ] 1.3 Set up tsconfig.json and build tooling
- [ ] 1.4 Create extension activation entry point

## 2. Custom Tool Implementations

- [ ] 2.1 Implement openFile tool (opens file at specified line)
- [ ] 2.2 Implement highlightLines tool (highlights line range in current file)
- [ ] 2.3 Implement navigateToLine tool (scrolls to and centers specific line)
- [ ] 2.4 Add tool registration mechanism in extension activation
- [ ] 2.5 Implement error handling for tool invocations (file not found, invalid line numbers)

## 3. VS Code Editor Integration

- [ ] 3.1 Create file opener utility using vscode.workspace.openTextDocument
- [ ] 3.2 Implement line highlighting using vscode.window.showTextDocument with selection
- [ ] 3.3 Add viewport scrolling to center highlighted code
- [ ] 3.4 Handle file resolution for workspace-relative paths
- [ ] 3.5 Add support for multi-root workspaces
- [ ] 3.6 Implement visual feedback for tool invocations (status bar, notifications)

## 4. Custom Agent Definition

- [ ] 4.1 Create .github/agents directory structure
- [ ] 4.2 Write dante.agent.md with YAML frontmatter
- [ ] 4.3 Define agent tools in YAML (openFile, highlightLines, navigateToLine)
- [ ] 4.4 Write agent prompt with tour guide instructions
- [ ] 4.5 Add overview-first pattern to agent prompt
- [ ] 4.6 Add user-pacing instructions to agent prompt
- [ ] 4.7 Include examples of good tour narratives in agent definition

## 5. Agent Behavior Refinement

- [ ] 5.1 Add instructions for step-by-step code explanations
- [ ] 5.2 Define transition phrases between tour stops
- [ ] 5.3 Add instructions for handling user questions mid-tour
- [ ] 5.4 Include guidance for detecting deep-dive requests vs simple questions
- [ ] 5.5 Add tour completion and follow-up prompt instructions

## 6. Integration and Testing

- [ ] 6.1 Test extension activation and tool registration
- [ ] 6.2 Test individual tools (openFile, highlightLines, navigateToLine)
- [ ] 6.3 Test agent invocation and basic responses
- [ ] 6.4 Test full tour flow: question → overview → multi-stop tour → completion
- [ ] 6.5 Test file navigation with various path formats and edge cases
- [ ] 6.6 Test user interruptions (questions, skip requests)
- [ ] 6.7 Test error scenarios (missing files, invalid lines)
- [ ] 6.8 Create example workspace with known code structure for demo testing

## 7. Documentation

- [ ] 7.1 Write README with installation and usage instructions
- [ ] 7.2 Document how to invoke Dante agent in Copilot chat
- [ ] 7.3 Add examples of good questions to ask Dante
- [ ] 7.4 Document custom tools and their parameters
- [ ] 7.5 Document known limitations and future enhancements
- [ ] 7.6 Add architecture diagram showing agent + extension relationship
