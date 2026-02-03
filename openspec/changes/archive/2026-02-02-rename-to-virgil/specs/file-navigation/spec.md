## RENAMED Requirements

### Requirement: Visual feedback
- **FROM:** Status bar messages prefixed with "Dante:"
- **TO:** Status bar messages prefixed with "Virgil:"

## MODIFIED Requirements

### Requirement: Visual feedback
The extension SHALL provide visual feedback when tools are invoked.

#### Scenario: Status bar notification
- **WHEN** tool is invoked successfully
- **THEN** extension shows brief status bar message prefixed with "Virgil:" confirming action

#### Scenario: Error notification
- **WHEN** tool invocation fails
- **THEN** extension shows error message to user prefixed with "Virgil:"
