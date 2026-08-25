import type { BaseIssue } from "valibot";

export function logParseWarning(issues: BaseIssue<unknown>[]): void {
  const message: string[] = [];

  for (const issue of issues) {
    message.push(
      `Parse warning @\n${
        JSON.stringify(issue.path, null, 2)
      }\n: ${issue.message}`,
    );
  }

  // TODO; error out instead
  console.warn(message.join("\n"));
  console.trace();
}
