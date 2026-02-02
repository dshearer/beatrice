## ADDED Requirements

### Requirement: Provide narrative explanations
The agent SHALL provide clear, narrative explanations at each tour stop that explain what the code does and why it matters.

#### Scenario: Explain code purpose
- **WHEN** agent shows a tour stop
- **THEN** agent explains what the code does in natural language

#### Scenario: Explain code connections
- **WHEN** agent shows code that calls other functions
- **THEN** agent explains how the pieces connect and why

### Requirement: Explain tour progression
The agent SHALL explain why it is moving from one tour stop to the next.

#### Scenario: Transition explanation
- **WHEN** agent moves to the next tour stop
- **THEN** agent explains the connection between the previous stop and the current one

#### Scenario: Follow code flow
- **WHEN** touring a sequence of operations
- **THEN** agent uses language like "first", "then", "next" to indicate flow

### Requirement: Answer questions mid-tour
The agent SHALL respond to user questions during the tour without losing context.

#### Scenario: Brief answer by default
- **WHEN** user asks a clarifying question mid-tour
- **THEN** agent provides a brief answer and asks if user is ready to continue

#### Scenario: Deep dive on request
- **WHEN** user explicitly requests more detail (e.g., "show me how that works")
- **THEN** agent branches into a sub-tour before returning to the main tour

#### Scenario: Maintain tour context
- **WHEN** user asks a question mid-tour
- **THEN** agent maintains context of where they are in the main tour

### Requirement: Use clear prompts for user actions
The agent SHALL include clear prompts that help users understand how to control the tour.

#### Scenario: Prompt for continuation
- **WHEN** agent finishes explaining a tour stop
- **THEN** agent includes a prompt like "Ready to continue?" or "Type 'next' when ready"

#### Scenario: Acknowledge user signals
- **WHEN** user signals they're ready to continue
- **THEN** agent acknowledges and proceeds to the next stop
