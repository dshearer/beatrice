## ADDED Requirements

### Requirement: Open files at specific locations
The system SHALL open files in the VS Code editor at specific line numbers and highlight relevant code sections.

#### Scenario: Open file at line number
- **WHEN** agent navigates to a tour stop
- **THEN** system opens the file and positions the cursor at the specified line number

#### Scenario: Highlight code range
- **WHEN** agent references a multi-line code block
- **THEN** system highlights the entire range of lines being discussed

### Requirement: Control editor viewport
The system SHALL ensure that highlighted code is visible in the editor viewport.

#### Scenario: Scroll to highlighted code
- **WHEN** system opens a file and highlights lines
- **THEN** editor automatically scrolls to ensure highlighted lines are centered in the viewport

#### Scenario: File already open
- **WHEN** system navigates to a file that is already open in an editor tab
- **THEN** system reuses the existing tab and updates the selection

### Requirement: Handle navigation errors gracefully
The system SHALL handle cases where files cannot be opened or do not exist.

#### Scenario: File does not exist
- **WHEN** agent attempts to open a non-existent file
- **THEN** system notifies the user in chat that the file could not be found

#### Scenario: File cannot be read
- **WHEN** agent attempts to open a file without read permissions
- **THEN** system displays an error message and continues the tour

### Requirement: Support workspace-relative paths
The system SHALL resolve file paths relative to the current workspace root.

#### Scenario: Open file with relative path
- **WHEN** agent specifies a path like "src/auth/login.ts"
- **THEN** system resolves it relative to the workspace root and opens the file

#### Scenario: Multi-root workspace
- **WHEN** user has multiple workspace folders
- **THEN** system searches across all workspace roots to find the file
