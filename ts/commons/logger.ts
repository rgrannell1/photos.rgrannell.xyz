// TODO dd typing

export function logParseWarning(issues: any): void {
  const message: string[] = [];

  for (const issue of issues) {

    console.log(issue)

    message.push(`Parse warning @\n${JSON.stringify(issue.path, null, 2)}\n: ${issue.message}`);
  }

  // TODO; error out instead
  console.warn(message.join("\n"));
}
