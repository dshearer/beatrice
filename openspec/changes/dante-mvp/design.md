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

### 1. GitHub Copilot Agent as the Core

**Decision**: Build around a custom GitHub Copilot agent rather than a standalone language model integration.

**Rationale**:
- Copilot already has deep codebase understanding and context management
- Agent API provides chat participant integration (@dante in chat)
- Leverages existing user authentication and API access
- Natural fit for VS Code extension ecosystem

**Alternative considered**: OpenAI API or Anthropic API directly
- More control over prompting and model selection
- But requires separate auth, context building, and embedding infrastructure
- Copilot's existing context is valuable

### 2. Tour Flow: Overview-First Pattern

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

### 3. User-Controlled Pacing

**Decision**: After each tour stop (file opened + explanation given), agent waits for user signal before proceeding.

**Rationale**:
- User needs time to read code and understand
- Prevents cognitive overload
- Allows questions mid-tour
- Matches natural conversation pace

**Implementation**: User can type "next", "continue", or any message to proceed. Questions are answered briefly by default, but user can request deeper dives.

### 4. Chat Panel + Editor Navigation

**Decision**: Explanations appear in the Copilot chat panel while the agent simultaneously controls editor navigation (opening files, highlighting lines).

**Rationale**:
- Separates narrative (chat) from code (editor)
- User can reference both simultaneously
- Familiar UX (similar to existing Copilot chat)
- No need for custom webview UI for MVP

**Alternative considered**: Inline code decorations/annotations
- More visually integrated
- But requires custom decoration management and can clutter the editor
- Save for future enhancement

### 5. VS Code Extension APIs for Navigation

**Decision**: Use VS Code's `vscode.window.showTextDocument()` and editor selection APIs to open files and highlight code.

**Rationale**:
- Standard VS Code APIs, well-documented
- Reliable and performant
- No special permissions required
- Can precisely control cursor position and visible range

**Key APIs**:
- `vscode.workspace.openTextDocument(uri)` - open file
- `vscode.window.showTextDocument(doc, { selection: range })` - show with highlight
- `vscode.Range` - specify line/column ranges to highlight

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
