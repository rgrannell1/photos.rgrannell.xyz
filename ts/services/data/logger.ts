import type { BaseIssue } from "valibot";

/** Format one validation issue with its structured path. */
function formatParseWarning(issue: BaseIssue<unknown>): string {
  const path = JSON.stringify(issue.path, null, 2);
  const message = `Parse warning @\n${path}\n: ${issue.message}`;
  return message;
}

/** Log validation issues as warnings with a trace for diagnosis. */
export function logParseWarning(issues: BaseIssue<unknown>[]): void {
  const messages = issues.map(formatParseWarning);
  const output = messages.join("\n");

  // TODO; error out instead
  console.warn(output);
  console.trace();
}
