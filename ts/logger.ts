
import { z } from "zod";

export function logParseWarning(issues: z.ZodIssue[]): void {
  const message: string[] = [];

  for (const issue of issues) {
    message.push(`Parse warning [${issue.path.join(".")}]: ${issue.message}`);
  }

  console.warn(message.join("\n"));
}
