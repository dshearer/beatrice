## RENAMED Requirements

### Requirement: Agent provides guided code tours
- **FROM:** "Dante agent"
- **TO:** "Virgil agent"

### Requirement: Agent declares custom tools
- **FROM:** Tools referenced as `dante.dante/openFile`, `dante.dante/highlightLines`, `dante.dante/navigateToLine`
- **TO:** Tools referenced as `virgil.virgil/openFile`, `virgil.virgil/highlightLines`, `virgil.virgil/navigateToLine`

## MODIFIED Requirements

### Requirement: Agent provides guided code tours
The custom GitHub Copilot agent SHALL provide guided code tours by analyzing user questions and orchestrating tool calls to navigate the editor.

#### Scenario: User asks about a feature
- **WHEN** user asks "How does authentication work?" to the Virgil agent
- **THEN** agent responds with an overview of authentication components and invokes openFile tool to start the tour

#### Scenario: User asks about specific function
- **WHEN** user asks "What does validateUser do?"
- **THEN** agent provides overview and invokes openFile tool at the function definition location

### Requirement: Agent declares custom tools
The agent definition SHALL declare the custom tools (openFile, highlightLines, navigateToLine) in its YAML frontmatter under the `virgil.virgil/` namespace.

#### Scenario: Tools listed in agent YAML
- **WHEN** agent definition is created
- **THEN** YAML frontmatter includes tools: `virgil.virgil/openFile`, `virgil.virgil/highlightLines`, `virgil.virgil/navigateToLine`

#### Scenario: Agent invokes declared tools
- **WHEN** agent needs to navigate to code
- **THEN** agent invokes one of the declared tools with appropriate parameters

### Requirement: Agent file identity
The agent definition file SHALL be named `virgil.agent.md` and the agent's `name` field in YAML frontmatter SHALL be "Virgil".

#### Scenario: Agent file naming
- **WHEN** agent definition file is created or installed
- **THEN** file SHALL be named `virgil.agent.md` and placed in `.github/agents/`

#### Scenario: Agent persona
- **WHEN** agent introduces itself or is referenced in prompts
- **THEN** agent identity SHALL be "Virgil"
