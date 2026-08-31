/** Formats a millisecond timestamp as an American date and time. */
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
