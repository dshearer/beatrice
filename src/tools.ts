import * as vscode from "vscode";

let highlightDecoration: vscode.TextEditorDecorationType | undefined;

function resolveFilePath(filePath: string): vscode.Uri | undefined {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return undefined;
  }

  for (const folder of workspaceFolders) {
    const uri = vscode.Uri.joinPath(folder.uri, filePath);
    return uri;
  }

  return undefined;
}

function clampLine(line: number, document: vscode.TextDocument): number {
  const maxLine = document.lineCount;
  if (line < 1) {
    return 1;
  }
  if (line > maxLine) {
    return maxLine;
  }
  return line;
}

function clearHighlight() {
  if (highlightDecoration) {
    highlightDecoration.dispose();
    highlightDecoration = undefined;
  }
}

function applyHighlight(
  editor: vscode.TextEditor,
  startLine: number,
  endLine: number
) {
  clearHighlight();

  highlightDecoration = vscode.window.createTextEditorDecorationType({
    backgroundColor: new vscode.ThemeColor(
      "editor.findMatchHighlightBackground"
    ),
    isWholeLine: true,
  });

  const start = clampLine(startLine, editor.document);
  const end = clampLine(endLine, editor.document);
  const range = new vscode.Range(start - 1, 0, end - 1, Number.MAX_VALUE);
  editor.setDecorations(highlightDecoration, [range]);
}

function centerLineInViewport(editor: vscode.TextEditor, line: number) {
  const clamped = clampLine(line, editor.document);
  const position = new vscode.Position(clamped - 1, 0);
  editor.selection = new vscode.Selection(position, position);
  editor.revealRange(
    new vscode.Range(position, position),
    vscode.TextEditorRevealType.InCenter
  );
}

async function openFileTool(
  args: { path: string; line?: number; endLine?: number },
  _token: vscode.CancellationToken
): Promise<string> {
  const uri = resolveFilePath(args.path);
  if (!uri) {
    return JSON.stringify({
      success: false,
      error: "No workspace folder found",
    });
  }

  let document: vscode.TextDocument;
  try {
    document = await vscode.workspace.openTextDocument(uri);
  } catch {
    return JSON.stringify({
      success: false,
      error: `File not found: ${args.path}`,
    });
  }

  const line = args.line ? clampLine(args.line, document) : 1;
  const position = new vscode.Position(line - 1, 0);

  const editor = await vscode.window.showTextDocument(document, {
    selection: new vscode.Range(position, position),
    preserveFocus: false,
  });

  centerLineInViewport(editor, line);

  if (args.line && args.endLine) {
    applyHighlight(editor, args.line, args.endLine);
  }

  vscode.window.setStatusBarMessage(`Beatrice: Opened ${args.path}`, 3000);

  return JSON.stringify({
    success: true,
    file: args.path,
    line,
    totalLines: document.lineCount,
  });
}

async function highlightLinesTool(
  args: { startLine: number; endLine: number },
  _token: vscode.CancellationToken
): Promise<string> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return JSON.stringify({ success: false, error: "No active editor" });
  }

  applyHighlight(editor, args.startLine, args.endLine);
  centerLineInViewport(editor, args.startLine);

  vscode.window.setStatusBarMessage(
    `Beatrice: Highlighted lines ${args.startLine}-${args.endLine}`,
    3000
  );

  return JSON.stringify({
    success: true,
    startLine: clampLine(args.startLine, editor.document),
    endLine: clampLine(args.endLine, editor.document),
  });
}

async function navigateToLineTool(
  args: { line: number },
  _token: vscode.CancellationToken
): Promise<string> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return JSON.stringify({ success: false, error: "No active editor" });
  }

  centerLineInViewport(editor, args.line);

  vscode.window.setStatusBarMessage(
    `Beatrice: Navigated to line ${args.line}`,
    3000
  );

  return JSON.stringify({
    success: true,
    line: clampLine(args.line, editor.document),
  });
}

export function registerTools(context: vscode.ExtensionContext) {
  console.log("[Beatrice] Registering tools...");
  console.log("[Beatrice] vscode.lm available:", !!vscode.lm);
  console.log("[Beatrice] vscode.lm.registerTool available:", !!vscode.lm?.registerTool);

  context.subscriptions.push(
    vscode.lm.registerTool("beatrice_openFile", {
      async prepareInvocation(
        options: vscode.LanguageModelToolInvocationPrepareOptions<{
          path: string;
          line?: number;
          endLine?: number;
        }>,
        _token: vscode.CancellationToken
      ) {
        const line = options.input.line ? `:${options.input.line}` : "";
        return {
          invocationMessage: `Opening ${options.input.path}${line}`,
        };
      },
      async invoke(
        options: vscode.LanguageModelToolInvocationOptions<{
          path: string;
          line?: number;
          endLine?: number;
        }>,
        token: vscode.CancellationToken
      ) {
        console.log("[Beatrice] openFile invoked with:", options.input);
        const result = await openFileTool(options.input, token);
        return new vscode.LanguageModelToolResult([
          new vscode.LanguageModelTextPart(result),
        ]);
      },
    })
  );

  context.subscriptions.push(
    vscode.lm.registerTool("beatrice_highlightLines", {
      async prepareInvocation(
        options: vscode.LanguageModelToolInvocationPrepareOptions<{
          startLine: number;
          endLine: number;
        }>,
        _token: vscode.CancellationToken
      ) {
        return {
          invocationMessage: `Highlighting lines ${options.input.startLine}-${options.input.endLine}`,
        };
      },
      async invoke(
        options: vscode.LanguageModelToolInvocationOptions<{
          startLine: number;
          endLine: number;
        }>,
        token: vscode.CancellationToken
      ) {
        const result = await highlightLinesTool(options.input, token);
        return new vscode.LanguageModelToolResult([
          new vscode.LanguageModelTextPart(result),
        ]);
      },
    })
  );

  context.subscriptions.push(
    vscode.lm.registerTool("beatrice_navigateToLine", {
      async prepareInvocation(
        options: vscode.LanguageModelToolInvocationPrepareOptions<{
          line: number;
        }>,
        _token: vscode.CancellationToken
      ) {
        return {
          invocationMessage: `Navigating to line ${options.input.line}`,
        };
      },
      async invoke(
        options: vscode.LanguageModelToolInvocationOptions<{
          line: number;
        }>,
        token: vscode.CancellationToken
      ) {
        const result = await navigateToLineTool(options.input, token);
        return new vscode.LanguageModelToolResult([
          new vscode.LanguageModelTextPart(result),
        ]);
      },
    })
  );
}
