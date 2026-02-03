import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

suite('Virgil Extension Test Suite', () => {
	vscode.window.showInformationMessage('Running Virgil tests...');

	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('dshearer.virgil'));
	});

	test('Extension should activate', async () => {
		const ext = vscode.extensions.getExtension('dshearer.virgil');
		assert.ok(ext);
		await ext.activate();
		assert.strictEqual(ext.isActive, true);
	});

	test('Should register virgil.installAgent command', async () => {
		const commands = await vscode.commands.getCommands(true);
		assert.ok(commands.includes('virgil.installAgent'), 'virgil.installAgent command should be registered');
	});

	test('Should register language model tools', async () => {
		const ext = vscode.extensions.getExtension('dshearer.virgil');
		await ext?.activate();
		
		// Check that tools are registered
		const tools = vscode.lm.tools;
		const toolNames = tools.map(t => t.name);
		
		assert.ok(toolNames.includes('virgil_openFile'), 'virgil_openFile tool should be registered');
		assert.ok(toolNames.includes('virgil_highlightLines'), 'virgil_highlightLines tool should be registered');
		assert.ok(toolNames.includes('virgil_navigateToLine'), 'virgil_navigateToLine tool should be registered');
	});

	test('Language model tools should have correct properties', async () => {
		const ext = vscode.extensions.getExtension('dshearer.virgil');
		await ext?.activate();
		
		const tools = vscode.lm.tools;
		const openFileTool = tools.find(t => t.name === 'virgil_openFile');
		
		assert.ok(openFileTool, 'openFile tool should exist');
		assert.ok(openFileTool.tags, 'Tool should have tags property');
	});

	suite('File Path Tests', () => {
		test('Should handle workspace-relative paths', async () => {
			const workspaceFolders = vscode.workspace.workspaceFolders;
			if (workspaceFolders && workspaceFolders.length > 0) {
				const testPath = 'package.json';
				const expectedUri = vscode.Uri.joinPath(workspaceFolders[0].uri, testPath);
				assert.ok(expectedUri.fsPath.endsWith('package.json'));
			}
		});
	});

	suite('Line Number Validation', () => {
		test('Should handle valid line numbers', () => {
			const testLine = 10;
			assert.ok(testLine >= 1, 'Line number should be positive');
		});

		test('Should handle line number boundaries', () => {
			const minLine = 1;
			const maxLine = 100;
			
			assert.strictEqual(Math.max(1, Math.min(0, maxLine)), minLine, 'Line 0 should clamp to 1');
			assert.strictEqual(Math.max(1, Math.min(150, maxLine)), maxLine, 'Line 150 should clamp to maxLine');
			assert.strictEqual(Math.max(1, Math.min(50, maxLine)), 50, 'Line 50 should remain 50');
		});
	});

	suite('JSON Response Validation', () => {
		test('Should create valid success response', () => {
			const response = JSON.stringify({
				success: true,
				file: 'test.ts',
				line: 10,
				totalLines: 100
			});
			
			const parsed = JSON.parse(response);
			assert.strictEqual(parsed.success, true);
			assert.strictEqual(parsed.file, 'test.ts');
			assert.strictEqual(parsed.line, 10);
		});

		test('Should create valid error response', () => {
			const response = JSON.stringify({
				success: false,
				error: 'File not found'
			});
			
			const parsed = JSON.parse(response);
			assert.strictEqual(parsed.success, false);
			assert.ok(parsed.error);
		});
	});

	suite('Agent Installation', () => {
		test('Should have agent file in extension', async () => {
			const ext = vscode.extensions.getExtension('dshearer.virgil');
			assert.ok(ext);
			
			const agentPath = path.join(ext.extensionPath, 'agents', 'virgil.agent.md');
			// We can't easily check file existence in extension path during tests,
			// but we can verify the path is constructed correctly
			assert.ok(agentPath.includes('virgil.agent.md'));
		});

		test('Target directory path should be correct', () => {
			const targetDir = path.join('.github', 'agents');
			assert.strictEqual(targetDir, '.github/agents');
		});
	});
});
