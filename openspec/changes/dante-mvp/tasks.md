## 1. Project Setup

- [ ] 1.1 Initialize VS Code extension project structure with TypeScript
- [ ] 1.2 Configure package.json with GitHub Copilot extension dependencies
- [ ] 1.3 Set up tsconfig.json and build tooling
- [ ] 1.4 Add VS Code extension manifest (package.json) with Copilot chat participant contribution

## 2. GitHub Copilot Agent Integration

- [ ] 2.1 Implement Copilot chat participant registration (@dante)
- [ ] 2.2 Create agent request handler that receives user questions
- [ ] 2.3 Implement overview generation logic (analyze question, identify files, create numbered list)
- [ ] 2.4 Add context extraction from workspace to inform tour planning
- [ ] 2.5 Implement error handling for context limitations and missing files

## 3. File Navigation System

- [ ] 3.1 Create file opener utility using vscode.workspace.openTextDocument
- [ ] 3.2 Implement line highlighting using vscode.window.showTextDocument with selection
- [ ] 3.3 Add viewport scrolling to center highlighted code
- [ ] 3.4 Handle file resolution for workspace-relative paths
- [ ] 3.5 Implement error handling for non-existent or unreadable files
- [ ] 3.6 Add support for multi-root workspaces

## 4. Tour Orchestration

- [ ] 4.1 Create Tour class to manage tour state (stops, current position, completion status)
- [ ] 4.2 Implement tour stop data structure (file path, line range, explanation text)
- [ ] 4.3 Build tour planner that converts user question into sequence of tour stops
- [ ] 4.4 Add tour progression logic (overview → stop 1 → stop 2 → ... → complete)
- [ ] 4.5 Implement tour stop execution (send explanation to chat + trigger file navigation)

## 5. Chat Narration

- [ ] 5.1 Implement chat response formatting for tour explanations
- [ ] 5.2 Add transition phrases between tour stops ("First...", "Next...", "Finally...")
- [ ] 5.3 Create prompts for user continuation ("Ready to continue?", "Type 'next' when ready")
- [ ] 5.4 Implement brief question answering mid-tour
- [ ] 5.5 Add logic to detect deep-dive requests vs simple questions

## 6. Tour Flow Control

- [ ] 6.1 Implement pause/wait state after each tour stop
- [ ] 6.2 Add user input parsing to detect continuation signals ("next", "continue", empty message)
- [ ] 6.3 Handle question interruptions (answer + return to waiting state)
- [ ] 6.4 Implement tour cancellation on user request
- [ ] 6.5 Add progress tracking (current stop index, total stops)
- [ ] 6.6 Create tour completion handler with follow-up prompt

## 7. Integration and Testing

- [ ] 7.1 Test extension activation and Copilot participant registration
- [ ] 7.2 Test basic tour flow: question → overview → multi-stop tour → completion
- [ ] 7.3 Test file navigation with various path formats and edge cases
- [ ] 7.4 Test user interruptions (questions, skip requests, cancellation)
- [ ] 7.5 Test error scenarios (missing files, context overflow, invalid paths)
- [ ] 7.6 Create example workspace with known code structure for demo testing

## 8. Documentation

- [ ] 8.1 Write README with installation and usage instructions
- [ ] 8.2 Document how to invoke Dante (@dante in Copilot chat)
- [ ] 8.3 Add examples of good questions to ask Dante
- [ ] 8.4 Document known limitations and future enhancements
