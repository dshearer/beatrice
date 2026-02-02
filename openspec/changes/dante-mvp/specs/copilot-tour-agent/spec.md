## ADDED Requirements

### Requirement: Agent responds to code questions with tours
The Copilot agent SHALL respond to user questions about code by initiating guided tours that combine textual explanations with file navigation.

#### Scenario: User asks about a feature
- **WHEN** user asks "How does authentication work?" in Copilot chat
- **THEN** agent responds with an overview of authentication components and initiates a tour

#### Scenario: User asks about specific function
- **WHEN** user asks "What does validateUser do?"
- **THEN** agent provides overview and opens the relevant file at the function definition

### Requirement: Agent provides overview before tour
The agent SHALL provide a structured overview of what it will show before starting the tour navigation.

#### Scenario: Overview shows tour structure
- **WHEN** agent begins a tour in response to a question
- **THEN** agent first outputs a numbered list of the main components or steps it will cover

#### Scenario: Overview references file locations
- **WHEN** agent provides the overview
- **THEN** each overview item SHALL include the relevant file path(s)

### Requirement: Agent coordinates chat and navigation
The agent SHALL synchronize explanations in the chat panel with file navigation actions in the editor.

#### Scenario: Explanation followed by navigation
- **WHEN** agent explains a tour stop
- **THEN** agent opens the relevant file immediately after the explanation

#### Scenario: Navigation targets specific lines
- **WHEN** agent opens a file during a tour
- **THEN** agent highlights the specific lines being discussed

### Requirement: Agent handles context limitations
The agent SHALL operate within GitHub Copilot's context limitations and gracefully handle large codebases.

#### Scenario: Context window exceeded
- **WHEN** agent cannot fit all relevant code in context
- **THEN** agent focuses on the most relevant files and acknowledges limitations

#### Scenario: File not found
- **WHEN** agent cannot locate a file it wants to show
- **THEN** agent explains what it was looking for and continues the tour with available information
