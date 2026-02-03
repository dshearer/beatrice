import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

const AGENT_FILENAME = "beatrice.agent.md";
const TARGET_DIR = path.join(".github", "agents");

export function registerInstallAgentCommand(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("beatrice.installAgent", () => {
      const folders = vscode.workspace.workspaceFolders;
      if (!folders || folders.length === 0) {
        vscode.window.showErrorMessage("Beatrice: No workspace folder open.");
        return;
      }

      const bundledPath = path.join(context.extensionPath, "agents", AGENT_FILENAME);

      for (const folder of folders) {
        const targetDir = path.join(folder.uri.fsPath, TARGET_DIR);
        const targetPath = path.join(targetDir, AGENT_FILENAME);

        if (fs.existsSync(targetPath)) {
          vscode.window.showInformationMessage(
            `Beatrice: Agent already installed in ${folder.name}.`
          );
          continue;
        }

        fs.mkdirSync(targetDir, { recursive: true });
        fs.copyFileSync(bundledPath, targetPath);
        vscode.window.showInformationMessage(
          `Beatrice: Installed agent to ${folder.name}/${TARGET_DIR}/${AGENT_FILENAME}`
        );
      }
    })
  );
}
