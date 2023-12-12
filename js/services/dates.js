export class Dates {
  static dateRange(minDate, maxDate) {
    if (!minDate && !maxDate) {
      return "unknown date";
    }

    const parsedMinDate = new Date(parseFloat(minDate));
    const parsedMaxDate = new Date(parseFloat(maxDate));

    const opts = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const from = parsedMinDate.toLocaleDateString("en-IE", opts);
    const to = parsedMaxDate.toLocaleDateString("en-IE", opts);

    if (from === to) {
      return from;
    }

    return `${from} — ${to}`;
  }
}
