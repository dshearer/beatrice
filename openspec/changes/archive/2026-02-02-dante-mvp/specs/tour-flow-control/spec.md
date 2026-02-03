## ADDED Requirements

### Requirement: Agent implements user-controlled pacing
The agent's prompt SHALL instruct it to wait for user input before proceeding to the next tour stop.

#### Scenario: Pause after each stop
- **WHEN** agent completes a tour stop explanation and tool invocation
- **THEN** agent waits for user to signal readiness before continuing

#### Scenario: User signals continuation
- **WHEN** user types "next", "continue", "ok", or sends any message
- **THEN** agent proceeds to the next tour stop

#### Scenario: Empty response interpreted as continuation
- **WHEN** user sends minimal acknowledgment
- **THEN** agent treats it as a continuation signal

### Requirement: Agent handles tour interruptions
The agent SHALL support user interruptions and modifications to the tour flow.

#### Scenario: Ask question mid-tour
- **WHEN** user asks a question instead of saying "next"
- **THEN** agent answers the question and then prompts to continue the tour

#### Scenario: Request to skip ahead
- **WHEN** user says "skip to X" or "show me Y instead"
- **THEN** agent adjusts the tour plan to focus on the requested topic

#### Scenario: Cancel tour
- **WHEN** user explicitly asks to stop or cancel the tour
- **THEN** agent acknowledges and exits tour mode

### Requirement: Agent tracks tour progress
The agent SHALL maintain awareness of tour position and communicate progress to the user.

#### Scenario: Indicate current position
- **WHEN** agent is in the middle of a multi-stop tour
- **THEN** agent provides context about which step they're on (e.g., "Next, let's look at..." or "The final piece is...")

#### Scenario: Complete tour
- **WHEN** agent finishes the last tour stop
- **THEN** agent signals completion and offers to answer follow-up questions

#### Scenario: Progress indication in multi-step tours
- **WHEN** tour has many stops
- **THEN** agent occasionally mentions how many more stops remain

### Requirement: Agent prompt includes flow control instructions
The agent's markdown prompt SHALL include detailed instructions for managing tour pacing and user control.

#### Scenario: Wait instructions included
- **WHEN** agent prompt is written
- **THEN** prompt instructs agent to explicitly wait for user signals between stops

#### Scenario: Interruption handling instructions
- **WHEN** agent prompt is written
- **THEN** prompt includes guidance on handling questions, skip requests, and cancellations

#### Scenario: Progress tracking instructions
- **WHEN** agent prompt is written
- **THEN** prompt instructs agent to track position and communicate progress

### Requirement: Agent handles ambiguous user input
The agent SHALL interpret user input appropriately based on tour context.

#### Scenario: Short acknowledgment
- **WHEN** user sends "ok", "got it", or similar brief response
- **THEN** agent interprets as continuation signal

#### Scenario: Question vs continuation
- **WHEN** user input contains a question mark or question words
- **THEN** agent treats it as a question rather than continuation signal

#### Scenario: Explicit navigation request
- **WHEN** user says "show me X" or "go to Y"
- **THEN** agent treats it as a navigation request rather than simple continuation
