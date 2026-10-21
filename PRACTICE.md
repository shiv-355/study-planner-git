# Start here

The competency is professional Git use. You do not need AWS, Docker, a server,
or a paid tool. The finished Study Planner opens by double-clicking
`index.html`. The application runs in a browser and stores tasks
locally. The included files and evidence were prepared with ChatGPT assistance.

## 1. Inspect the finished work

Open a terminal inside the cloned repository, then run:

```bash
git status
git log --graph --all --oneline --decorate
git show b7921d67e6bc
git show 6d0fe73622a4
```

The first two focused commits separately change the heading and help text.
The original seven-commit history is preserved in history/original-history.bundle.
The hosted history has additional publishing commits. No pull request or external review is claimed.

## 2. Practise the conflict yourself

First check that `git status` reports a clean working tree. Make a new local
practice branch from the saved progress feature, then try merging the filter:

```bash
git switch -c practice/resolve-heading origin/feature/progress-summary
git merge --no-ff origin/feature/completed-filter
git status
```

Git will report a conflict in `index.html`. This is expected. Open the file
in a text editor. Find the heading block beginning with `<<<<<<< HEAD` and
ending with `>>>>>>> feature/completed-filter`. Replace the whole block,
including its markers, with:

```html
<h1>Weekly Study Progress Planner</h1>
```

Save the file, then run:

```bash
git add index.html
git commit -m "Resolve the planner heading and retain both features"
git status
```

Open `index.html` and check that the progress count and completion filter both
work. Add a task, mark one complete, and switch among all, open, and completed
views. Take your own screenshots. The initial content includes three sample
tasks, of which one is complete. Counts may differ if that browser already
holds your saved tasks.

If you want to cancel an unfinished merge instead, use `git merge --abort`
before committing the resolution. After finishing the exercise, `git switch
main` returns to the supplied finished version.

## 3. Practise focused staging yourself

On a new branch from `main`, change the heading and the help sentence at the
bottom of the page. Those changes are far enough apart to appear as two hunks.

```bash
git switch -c practice/focused-commits
git diff
git add -p index.html
```

Answer `y` for the heading hunk and `n` for the help-text hunk. Then compare:

```bash
git diff --cached
git diff
```

Only the heading should be staged. Commit it with a clear message. Stage and
commit the help text separately. Explain why this is more useful than mixing
both topics in one commit.

## 4. Before submitting

Read the report and replace any personal reflection that does not describe your
own experience. Reproduce the commands, explain what they do, and acknowledge
assistance according to the course rules. The supplied evidence records real
commands run during this guided exercise, using a generic practice identity.
The local logs must not be described as independently completed work. Their commit IDs map to the hosted import in history/commit-map.json.

The source tutorial is Tobias Günther's *Git for Professionals Tutorial* on
freeCodeCamp: https://youtu.be/Uszj_k0DGsg. The practical focus is selective
staging, focused commits, feature branches, and conflict resolution. The video
also covers pull requests and merge versus rebase; those topics were studied,
but no hosted pull request or rebase is claimed here.

## Evidence files

- `01_partial_staging.txt`: real interactive staging and both diffs.
- `02_abort_and_retry.txt`: conflict, abort, and clean-state verification.
- `03_resolved_merge.txt`: the second merge attempt and its resolution.
- `04_history.txt`: the final branch and commit graph.
- `05_logic_verification.txt`: eight checks of the merged JavaScript logic.
- `all_commands.txt`: the complete Git command output.
- `verification.json`: the recorded Git results.
- `conflicted_index.txt`: the file while the planned conflict was present.
- PNG figures: readable renderings of excerpts from these real logs.

The optional `verify_logic.cjs` script uses Node.js without packages to check
the app's JavaScript in a lightweight DOM harness. It is not a real browser
rendering test. It is not needed to use the planner or complete the Git exercise.
