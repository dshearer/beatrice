## Context

Dante is a VS Code extension that uses GitHub Copilot to provide guided code tours. When users ask questions about a codebase, instead of just answering in text, Dante opens files, highlights code, and explains how things work - mimicking the experience of a coworker walking you through unfamiliar code.

This is a greenfield project with no existing codebase. We're building on top of GitHub Copilot's agent API (in preview) and VS Code's extension APIs.

## Goals / Non-Goals

**Goals:**
- Create an MVP that demonstrates the core tour experience: question → overview → step-by-step file navigation with explanations
- User controls pacing (not an auto-playing slideshow)
- Agent provides narrative explanations synchronized with code navigation
- Handle user questions mid-tour without derailing the whole tour

**Non-Goals:**
- Perfect accuracy (AI hallucination mitigation is important but not MVP-blocking)
- Multi-repo support
- Tour recording/playback
- Collaborative tours
- Complex branching narratives

## Decisions

### 1. Hybrid Architecture: Custom Agent + VS Code Extension

**Decision**: Build Dante as a custom GitHub Copilot agent (`.agent.md` file) that uses tools provided by a VS Code extension.

**Architecture**:
- **Custom Agent** (`.github/agents/dante.agent.md`): Defines the agent's behavior, prompts, tour planning logic, and available tools. Runs within GitHub Copilot's infrastructure.
- **VS Code Extension**: Implements the custom tools that the agent can invoke via standard tool calls.
- **Custom Tools**: `openFile`, `highlightLines`, `navigateToLine` - declared in agent YAML, implemented by extension.

**Rationale**:
- Copilot agents have deep codebase understanding and context management built-in
- Agent defines the "intelligence" (tour planning, narrative, question handling)
- Extension provides the "actions" (editor control, file navigation)
- Clean separation: agent can be updated without code changes, tools are reusable
- Leverages existing user authentication and API access

**Alternative considered**: Standalone VS Code extension with Language Model API
- Would require building our own context management and codebase understanding
- More control but significantly more complexity
- Copilot agent approach is simpler for MVP

### 2. Tool-Based Editor Control

**Decision**: The agent controls the editor by invoking custom tools (`openFile`, `highlightLines`, `navigateToLine`) implemented by the VS Code extension.

**How it works**:
1. Agent YAML declares available tools: `tools: openFile, highlightLines, navigateToLine`
2. VS Code extension registers implementations for these tools
3. During a tour, agent invokes tools via standard tool calls
4. Extension receives tool invocation and executes VS Code API calls
5. Tool returns success/failure to agent

**Example**:
```
Agent: "Let me show you the login function..."
Agent calls: openFile(path="src/auth/login.ts", line=45)
Extension: Opens file, scrolls to line 45
Extension returns: { success: true, visibleRange: "45-60" }
Agent: "As you can see on line 48..."
```

**Rationale**:
- Clean separation between intelligence (agent) and actions (extension)
- Agent can be updated by editing markdown without code deployment
- Tools are simple, focused, and testable
- Standard tool invocation pattern

### 3. Rely on Built-in Tools for Code Discovery

**Decision**: Use GitHub Copilot's built-in tools (`read`, `search`, etc.) for code discovery. Only implement custom tools for editor navigation.

**Rationale**:
- Built-in tools already provide robust code search and reading capabilities
- No need to duplicate functionality that exists
- Extension focuses on what only it can do: editor control
- Simpler implementation and maintenance

**Tool responsibilities**:
- **Built-in tools** (`read`, `search`): Agent uses these to find and understand code
- **Custom tools** (`openFile`, `highlightLines`, `navigateToLine`): Agent uses these to show code to the user

**Example workflow**:
```
1. User: "How does authentication work?"
2. Agent uses built-in `search` to find auth-related files
3. Agent uses built-in `read` to understand the code
4. Agent plans tour based on search results
5. Agent invokes custom `openFile` to show user the code
```

### 4. Tour Flow: Overview-First Pattern

**Decision**: When user asks a question, agent first provides a text overview of what it will show, then starts the tour.

**Rationale**:
- Sets expectations (user knows what's coming)
- Provides mental model before diving into code
- Matches how good coworkers explain things ("Let me give you the big picture first...")
- User can bail early if the overview shows the tour won't answer their question

**Example flow**:
```
User: "How does authentication work?"

Agent: "Authentication has three main parts:
        1. Login validation (auth/login.ts)
        2. Token management (middleware/jwt.ts)
        3. Session storage (db/sessions.ts)
        Let me walk you through it..."

[Opens first file]
```

### 5. User-Controlled Pacing

**Decision**: After each tour stop (file opened + explanation given), agent waits for user signal before proceeding.

**Rationale**:
- User needs time to read code and understand
- Prevents cognitive overload
- Allows questions mid-tour
- Matches natural conversation pace

**Implementation**: User can type "next", "continue", or any message to proceed. Questions are answered briefly by default, but user can request deeper dives.

### 6. Simplified Question Handling Mid-Tour

**Decision**: By default, answer user questions briefly and continue the tour. Only create sub-tours if user explicitly requests ("show me that" / "dig deeper into X").

**Rationale**:
- Keeps tour on track
- Prevents scope creep from every question
- User can always interrupt if they want more detail
- Matches how real walkthroughs work (quick asides vs full tangents)

## Risks / Trade-offs

**[Risk] Agent might hallucinate or show wrong code** → Mitigation: For MVP, accept this risk. Future: add confidence signals, allow user feedback/corrections mid-tour

**[Risk] Large repos might overwhelm the agent's context** → Mitigation: For MVP, assume medium-sized repos. Future: implement context windowing or explicit scope limiting

**[Risk] User might not know how to signal "next"** → Mitigation: Include helpful prompts like "Type 'next' to continue" after each stop

**[Risk] Copilot Agent API is in preview and might change** → Mitigation: Accept breaking changes as we're in MVP phase. Stay close to Copilot team updates.

**[Trade-off] Using Copilot agent means vendor lock-in** → Acceptable for MVP. The tour orchestration logic can be abstracted later if needed.

**[Trade-off] No tour history/replay** → Acceptable for MVP. Users can scroll chat history but can't replay file navigation. Future enhancement.

## Open Questions

- Should we limit max tour length (e.g., max 10 files)? Or let the agent decide?
- How do we handle files that don't exist or can't be opened?
- What's the UX for canceling a tour mid-way?
- Should we support "bookmarking" tour stops for later reference?
