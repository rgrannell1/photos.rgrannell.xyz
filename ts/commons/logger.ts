
// TODO dd typing

export function logParseWarning(issues: any): void {
  const message: string[] = [];

  for (const issue of issues) {
    message.push(`Parse warning [${issue.path.join(".")}]: ${issue.message}`);
  }

  console.warn(message.join("\n"));
}
