# Dante — Guided Code Tours

A VS Code extension that provides guided code tours through a GitHub Copilot agent. Instead of just answering questions in text, Dante opens files, highlights code, and walks you through the codebase step by step.

## Architecture

```
┌─────────────────────────────────────────────┐
│              GitHub Copilot Chat             │
│                                             │
│  User: "How does authentication work?"      │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │         Dante Agent                   │  │
│  │  (your-repo/.github/agents/dante.agent.md) │  │
│  │                                       │  │
│  │  - Plans tour stops                   │  │
│  │  - Provides narrative explanations    │  │
│  │  - Controls pacing                    │  │
│  │                                       │  │
│  │  Built-in tools: read, search         │  │
│  │  Custom tools: openFile,              │  │
│  │    highlightLines, navigateToLine     │  │
│  └──────────────┬────────────────────────┘  │
│                 │ tool calls                 │
│  ┌──────────────▼────────────────────────┐  │
│  │       Dante VS Code Extension         │  │
│  │                                       │  │
│  │  Implements custom tools:             │  │
│  │  - dante_openFile                     │  │
│  │  - dante_highlightLines              │  │
│  │  - dante_navigateToLine              │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

The **agent** (markdown file) handles intelligence — tour planning, narration, question handling. The **extension** (TypeScript) handles actions — opening files, highlighting lines, scrolling the editor.

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 in VS Code to launch the Extension Development Host
5. Copy `agents/dante.agent.md` into `.github/agents/` in the repo you want to tour

## Usage

1. Open a workspace in the Extension Development Host
2. Open Copilot Chat (`Ctrl+Shift+I` / `Cmd+Shift+I`)
3. Type `@dante` followed by your question

### Example Questions

- `@dante How does authentication work in this project?`
- `@dante Walk me through the API request lifecycle`
- `@dante What happens when a user logs in?`
- `@dante Show me how error handling works`
- `@dante How are database queries structured?`

### During a Tour

- Type **"next"** or **"continue"** to advance to the next stop
- Ask a **question** at any time — Dante will answer and offer to continue
- Say **"skip to X"** to jump to a specific topic
- Say **"stop"** to end the tour

## Custom Tools

### `dante_openFile`

Opens a file in the editor at a specified line.

| Parameter | Type     | Required | Description                              |
|-----------|----------|----------|------------------------------------------|
| `path`    | `string` | Yes      | Workspace-relative file path             |
| `line`    | `number` | No       | Line number to position cursor at (1-based) |
| `endLine` | `number` | No       | End line for highlighting a range        |

### `dante_highlightLines`

Highlights a range of lines in the active editor. Clears any previous highlight.

| Parameter   | Type     | Required | Description                    |
|-------------|----------|----------|--------------------------------|
| `startLine` | `number` | Yes      | Start line number (1-based)    |
| `endLine`   | `number` | Yes      | End line number (1-based)      |

### `dante_navigateToLine`

Scrolls the active editor to center a specific line in the viewport.

| Parameter | Type     | Required | Description                          |
|-----------|----------|----------|--------------------------------------|
| `line`    | `number` | Yes      | Line number to center (1-based)      |

## Known Limitations

- **Preview API**: Relies on GitHub Copilot's agent API which is in preview and may change
- **Context window**: Large codebases may exceed the agent's context window, limiting tour depth
- **No tour persistence**: Tours exist only in the chat session — no recording or replay
- **Single workspace**: Multi-root workspace support resolves files from the first matching root
- **AI accuracy**: The agent may occasionally reference incorrect line numbers or misinterpret code

## Development

```bash
npm install          # Install dependencies
npm run compile      # Build
npm run watch        # Build in watch mode
npm run lint         # Lint
```

## Future Enhancements

- Tour recording and playback
- Bookmarking tour stops
- Tour history and favorites
- Multi-repo support
- Confidence indicators for AI-generated explanations
- Custom tour templates
