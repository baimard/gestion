# .github/codex/prompts/issue.md

You are working on the GitHub issue that triggered this workflow.

Task:
- Read the issue title and body.
- Analyse the Gestion Nextcloud app.
- Implement the smallest safe change.
- Create a branch named codex/issue-${{ github.event.issue.number }}.
- Open a draft pull request targeting master.
- Reference the issue in the PR body.
- Do not merge automatically.

Constraints:
- Preserve PHP 8+ compatibility.
- Preserve Nextcloud compatibility.
- Avoid modifying generated translation files unless requested.
- Be careful with invoices, quotes, PDF generation, email, totals, taxes, and stored business data.
