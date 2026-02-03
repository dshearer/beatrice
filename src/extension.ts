import * as vscode from "vscode";
import { registerTools } from "./tools";
import { registerInstallAgentCommand } from "./agent";

export function activate(context: vscode.ExtensionContext) {
  console.log("[Dante] Extension activating...");
  registerTools(context);
  registerInstallAgentCommand(context);
  console.log("[Dante] Extension activated. Available LM tools:", vscode.lm.tools.map(t => t.name));
}

export function deactivate() {}
