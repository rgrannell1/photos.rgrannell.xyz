/* Format the created-at timestamp to a human-readable date */
export function formatCreatedAt(dateTime: string): string {
  const date = new Date(parseInt(dateTime));
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
