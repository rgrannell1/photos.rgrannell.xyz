/* Parse an image datetime to a JS date */
export function parse(dateTime: string): Date {
  let [date, time] = dateTime.split(" ");
  date = date.replace(/:/g, "-");

  return new Date(`${date} ${time}`);
}

/* Format an exif date as a normal datestring */
export function formatExifDate(dateTime: string): string {
  if (!dateTime) {
    return dateTime;
  }

  const createdAt = new Date(dateTime).toISOString();
  const [date, time] = createdAt.split("T")[0].replace(/\:/g, "-");

  return `${date.replace(/\:/g, "/")} ${time}`;
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
