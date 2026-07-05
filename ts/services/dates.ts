/* Parse an image datetime to a JS date */
export function parse(dateTime: string): Date {
  let [date, time] = dateTime.split(" ");
  date = date.replace(/:/g, "-");

  return new Date(`${date} ${time}`);
}

/* Format an exif date (e.g "2024:05:01 12:34:56") as a normal datestring */
export function formatExifDate(dateTime: string): string {
  if (!dateTime) {
    return dateTime;
  }

  const [date, time] = dateTime.split(" ");

  return `${date.replace(/:/g, "/")} ${time}`;
}

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
