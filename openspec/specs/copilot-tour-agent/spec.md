## ADDED Requirements

### Requirement: Agent provides guided code tours
The custom GitHub Copilot agent SHALL provide guided code tours by analyzing user questions and orchestrating tool calls to navigate the editor.

#### Scenario: User asks about a feature
- **WHEN** user asks "How does authentication work?" to the Virgil agent
- **THEN** agent responds with an overview of authentication components and invokes openFile tool to start the tour

#### Scenario: User asks about specific function
- **WHEN** user asks "What does validateUser do?"
- **THEN** agent provides overview and invokes openFile tool at the function definition location

### Requirement: Agent provides overview before tours
The agent SHALL provide a structured textual overview of what it will show before invoking any navigation tools.

#### Scenario: Overview shows tour structure
- **WHEN** agent begins a tour in response to a question
- **THEN** agent first outputs a numbered list of the main components or steps it will cover before invoking tools

#### Scenario: Overview references file locations
- **WHEN** agent provides the overview
- **THEN** each overview item SHALL include the relevant file path(s) that will be shown

### Requirement: Agent declares custom tools
The agent definition SHALL declare the custom tools (openFile, highlightLines, navigateToLine) in its YAML frontmatter under the `virgil.virgil/` namespace.

#### Scenario: Tools listed in agent YAML
- **WHEN** agent definition is created
- **THEN** YAML frontmatter includes tools: `virgil.virgil/openFile`, `virgil.virgil/highlightLines`, `virgil.virgil/navigateToLine`

#### Scenario: Agent invokes declared tools
- **WHEN** agent needs to navigate to code
- **THEN** agent invokes one of the declared tools with appropriate parameters

### Requirement: Agent prompt defines tour behavior
The agent's markdown prompt SHALL include detailed instructions for providing narrative tours with user-controlled pacing.

#### Scenario: Overview-first pattern instructed
- **WHEN** agent prompt is defined
- **THEN** prompt includes instructions to provide overview before navigating

#### Scenario: User pacing instructed
- **WHEN** agent prompt is defined
- **THEN** prompt includes instructions to wait for user signals between tour stops

### Requirement: Agent file identity
The agent definition file SHALL be named `virgil.agent.md` and the agent's `name` field in YAML frontmatter SHALL be "Virgil".

#### Scenario: Agent file naming
- **WHEN** agent definition file is created or installed
- **THEN** file SHALL be named `virgil.agent.md` and placed in `.github/agents/`

#### Scenario: Agent persona
- **WHEN** agent introduces itself or is referenced in prompts
- **THEN** agent identity SHALL be "Virgil"

### Requirement: Agent handles context limitations gracefully
The agent SHALL work within GitHub Copilot's context limitations and handle cases where it cannot find or understand code.

#### Scenario: Cannot locate relevant code
- **WHEN** agent cannot find code to answer the question
- **THEN** agent explains what it was looking for and suggests alternative approaches

#### Scenario: Context window constraints
- **WHEN** agent has limited context about the codebase
- **THEN** agent focuses on most relevant files and acknowledges limitations
