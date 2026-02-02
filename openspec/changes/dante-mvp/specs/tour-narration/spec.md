## ADDED Requirements

### Requirement: Agent provides narrative explanations
The agent's prompt SHALL instruct it to provide clear, narrative explanations at each tour stop that explain what the code does and why it matters.

#### Scenario: Explain code purpose
- **WHEN** agent shows a tour stop
- **THEN** agent explains what the code does in natural language before or after invoking navigation tools

#### Scenario: Explain code connections
- **WHEN** agent shows code that calls other functions
- **THEN** agent explains how the pieces connect and foreshadows the next tour stop

### Requirement: Agent explains tour progression
The agent SHALL explain why it is moving from one tour stop to the next.

#### Scenario: Transition explanation
- **WHEN** agent moves to the next tour stop
- **THEN** agent explains the connection between the previous stop and the current one

#### Scenario: Follow code flow
- **WHEN** touring a sequence of operations
- **THEN** agent uses transition language like "first", "then", "next", "finally" to indicate flow

### Requirement: Agent prompt includes transition phrases
The agent's markdown prompt SHALL include examples and instructions for using transition phrases between tour stops.

#### Scenario: Transition phrase examples provided
- **WHEN** agent prompt is written
- **THEN** prompt includes example transitions like "First, let's look at...", "Next, we'll see...", "Finally, this connects to..."

### Requirement: Agent answers questions mid-tour
The agent SHALL respond to user questions during tours without losing tour context.

#### Scenario: Brief answer by default
- **WHEN** user asks a clarifying question mid-tour
- **THEN** agent provides a brief answer and asks if user is ready to continue

#### Scenario: Deep dive on request
- **WHEN** user explicitly requests more detail (e.g., "show me how that works")
- **THEN** agent creates a sub-tour showing the requested detail

#### Scenario: Maintain tour context
- **WHEN** user asks a question mid-tour
- **THEN** agent remembers the current position in the main tour and can resume

### Requirement: Agent prompts for user action
The agent SHALL include clear prompts that help users understand how to control tour pacing.

#### Scenario: Prompt for continuation
- **WHEN** agent finishes explaining a tour stop
- **THEN** agent includes a prompt like "Ready to continue?" or "Type 'next' when ready"

#### Scenario: Acknowledge user signals
- **WHEN** user signals they're ready to continue
- **THEN** agent acknowledges briefly and proceeds to the next stop

### Requirement: Agent prompt includes narrative examples
The agent's markdown prompt SHALL include examples of good tour narratives to guide its behavior.

#### Scenario: Example tour included
- **WHEN** agent prompt is written
- **THEN** prompt includes a complete example tour showing proper narration style

#### Scenario: Good and bad examples
- **WHEN** agent prompt is written
- **THEN** prompt includes both good examples (clear, connected) and bad examples (too terse, disconnected) to avoid
