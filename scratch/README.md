# Task Scratchpads (`scratch/`)

This directory houses task-specific scratchpads for multi-session and multi-step work.

## Directory Structure

```
scratch/
└── task-001-feature-name/
    ├── 01-plan.md        # Approved implementation plan & specs
    ├── 02-impl-notes.md  # Implementation progress & architectural notes
    └── 03-verify.md      # Test results & verification command outputs
```

## Rules of Engagement

1. **State Lives on Disk:** Do not rely on conversational memory across window resets. Checkpoint in-flight work in a numbered markdown file.
2. **Checkboxes Are the Ledger:** Use `- [ ]` and `- [x]` to track progress. A newly initialized agent session resumes from the first unchecked box.
3. **Compaction:** Once a task is merged to `main` and recorded in `STATE.md`, old scratch directories may be archived or pruned.
