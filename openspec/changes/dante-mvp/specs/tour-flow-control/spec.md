## ADDED Requirements

### Requirement: User controls tour pacing
The system SHALL wait for user input before proceeding to the next tour stop.

#### Scenario: Pause after each stop
- **WHEN** agent completes a tour stop explanation and navigation
- **THEN** system waits for user to signal readiness before continuing

#### Scenario: User signals continuation
- **WHEN** user types "next", "continue", or sends any message
- **THEN** system proceeds to the next tour stop

### Requirement: Support tour interruption
The user SHALL be able to interrupt or modify the tour flow.

#### Scenario: Ask question mid-tour
- **WHEN** user asks a question instead of saying "next"
- **THEN** agent answers the question and waits for continuation signal

#### Scenario: Request to skip ahead
- **WHEN** user says "skip to X" or "show me Y instead"
- **THEN** agent adjusts the tour to focus on the requested topic

#### Scenario: Cancel tour
- **WHEN** user explicitly asks to stop or cancel the tour
- **THEN** agent acknowledges and exits tour mode

### Requirement: Track tour progress
The system SHALL maintain awareness of tour position and remaining stops.

#### Scenario: Indicate progress
- **WHEN** agent is in the middle of a multi-stop tour
- **THEN** agent provides context about which step they're on (e.g., "Next, let's look at..." or "The final piece is...")

#### Scenario: Complete tour
- **WHEN** agent finishes the last tour stop
- **THEN** agent signals completion and offers to answer follow-up questions

### Requirement: Handle empty user responses
The system SHALL interpret empty messages or simple acknowledgments as continuation signals.

#### Scenario: User sends just "ok" or "next"
- **WHEN** user sends a minimal continuation signal
- **THEN** agent proceeds to next stop without additional commentary

#### Scenario: User sends just Enter
- **WHEN** user sends an empty message
- **THEN** agent treats it as a continuation signal and proceeds
