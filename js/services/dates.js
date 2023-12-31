export class Dates {
  static parse(dateTime) {
    let [date, time] = dateTime.split(' ');
    date = date.replace(/:/g, '-');

    return new Date(`${date} ${time}`);
  }

  static findRange(images) {
    let minimum = Infinity;
    let maximum = -Infinity;

    for (const image of images) {
      if (!image.dateTime) {
        continue;
      }

      if (image.dateTime < minimum) {
        minimum = image.dateTime;
      }

      if (image.dateTime > maximum) {
        maximum = image.dateTime;
      }
    }

    return [minimum, maximum];
  }

  static dateRange(minDate, maxDate) {
    if (!minDate && !maxDate) {
      return "unknown date";
    }

    const parsedMinDate = minDate instanceof Date
      ? minDate
      : new Date(parseFloat(minDate));
    const parsedMaxDate = maxDate instanceof Date
      ? maxDate
      : new Date(parseFloat(maxDate));

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
