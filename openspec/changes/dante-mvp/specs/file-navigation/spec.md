## ADDED Requirements

### Requirement: openFile tool implementation
The VS Code extension SHALL implement an openFile tool that opens files at specified lines when invoked by the agent.

#### Scenario: Open file at line number
- **WHEN** agent invokes openFile with path and line number
- **THEN** extension opens the file and positions cursor at the specified line

#### Scenario: Open file with line range
- **WHEN** agent invokes openFile with path and line range (start, end)
- **THEN** extension opens file and highlights the entire range

#### Scenario: Tool returns success status
- **WHEN** openFile tool successfully opens a file
- **THEN** tool returns success response with visible range information

### Requirement: highlightLines tool implementation
The VS Code extension SHALL implement a highlightLines tool that highlights specified line ranges in the currently active file.

#### Scenario: Highlight range in current file
- **WHEN** agent invokes highlightLines with line range
- **THEN** extension highlights the specified lines in the active editor

#### Scenario: Update existing highlight
- **WHEN** agent invokes highlightLines while a previous highlight exists
- **THEN** extension removes previous highlight and applies new one

### Requirement: navigateToLine tool implementation
The VS Code extension SHALL implement a navigateToLine tool that scrolls to and centers a specific line in the active editor.

#### Scenario: Scroll to specific line
- **WHEN** agent invokes navigateToLine with line number
- **THEN** extension scrolls to position that line in the center of the viewport

#### Scenario: Navigate in already-open file
- **WHEN** agent invokes navigateToLine on an already-visible file
- **THEN** extension updates viewport without reopening the file

### Requirement: Tool error handling
All tools SHALL handle error cases gracefully and return informative error responses to the agent.

#### Scenario: File does not exist
- **WHEN** agent invokes openFile with non-existent path
- **THEN** tool returns error response indicating file not found

#### Scenario: Invalid line number
- **WHEN** agent invokes tool with line number beyond file length
- **THEN** tool returns error and opens/navigates to last line instead

#### Scenario: No active editor
- **WHEN** agent invokes highlightLines or navigateToLine with no active editor
- **THEN** tool returns error indicating no active editor

### Requirement: Workspace path resolution
Tools SHALL resolve file paths relative to the workspace root(s).

#### Scenario: Relative path resolution
- **WHEN** agent provides relative path like "src/auth/login.ts"
- **THEN** extension resolves it relative to workspace root

#### Scenario: Multi-root workspace support
- **WHEN** workspace has multiple root folders
- **THEN** extension searches all roots to locate the file

### Requirement: Visual feedback
The extension SHALL provide visual feedback when tools are invoked.

#### Scenario: Status bar notification
- **WHEN** tool is invoked successfully
- **THEN** extension shows brief status bar message confirming action

#### Scenario: Error notification
- **WHEN** tool invocation fails
- **THEN** extension shows error message to user
