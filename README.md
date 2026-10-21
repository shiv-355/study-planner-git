# Study Planner Git Practice

A small original browser app used to practise professional Git workflows.
Open `index.html` in a browser. Add a coursework task, choose its course and
priority, and mark it complete. The final version also shows completion progress
and filters all, open, or completed tasks. Data stays in that browser's storage.

## Branch convention

- `main` contains the combined working application.
- `feature/` branches contain one improvement at a time.
- Keep each commit focused on one topic and review the staged diff first.
- Use clear commit subjects. Add a body when the reason needs explanation.
- Merge completed branches; inspect the application after resolving a conflict.
- Start a merge with a clean working tree. Use `git merge --abort` to cancel an
  unfinished merge when needed. Do not rewrite shared history with rebase.

This is a local practice of a feature-branch workflow. It does not represent a
GitHub pull request or a review by another person. No remote is configured.

## Attribution

The application and the recorded Git exercise were produced with ChatGPT
assistance. Commits use a generic practice identity rather than claiming that
the student personally ran commands. The student should reproduce the exercise
and confirm the reflection matches their understanding before submission.
