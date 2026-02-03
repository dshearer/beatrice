# Virgil: Guided Code Tours

In 1321, Virgil guided Dante Alighieri through the nine circles of Hell. Today, artificial intelligence can guide you through
the most hellacious codebases.

Virgil is a VS Code extension that provides guided code tours, using a GitHub Copilot custom agent. Instead of just answering questions in text,
Virgil opens files, highlights code, and walks you through the codebase step by step.

## Status

This is experimental. But please give it a try!

## Requirements

You need GitHub Copilot, and of course VS Code. (Claude Code is great, but you really need a good IDE to do serious code exploration.)

## How to Use

### Starting a Tour

**One-time setup:** From the command palette, run "Virgil: Install Agent Prompt". This adds the custom agent prompt at `.github/agents/virgil.agent.md`. Feel free to commit this to git.

Open a Copilot Chat session by clicking on the little dialog icon at the top of your VS Code window:

<img src="dialog-icon.png" alt="Screenshot of the button at the top of the VS Code window that opens a Copilot Chat session" width="100">

At the bottom of the Copilot Chat view, there's a popup menu labelled "Agent"; click on that and you'll see "Virgil":

<img src="agent-selector.png" alt="Screenshot of the popup menu for selecting AI agents in the Copilot Chat view" width="300">

With the "Virgil" agent selected, tell Virgil what you'd like to learn about in your codebase.

### During a Tour

Virgil will lead the tour, but it's still a conversation. Speak up if you don't understand something! Go on tangents!
You can ask to go to a previous step, or for modifications to the current tour plan, or even for a totally different tour.