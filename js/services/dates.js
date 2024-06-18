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

  static dateRange(minDate, maxDate, smallDevice) {
    if (!minDate && !maxDate) {
      return "unknown date";
    }

    const parsedMinDate = minDate instanceof Date
      ? minDate
      : new Date(parseFloat(minDate));
    const parsedMaxDate = maxDate instanceof Date
      ? maxDate
      : new Date(parseFloat(maxDate));

    if (smallDevice) {
      const optsShort = {
        day: "numeric",
        month: "short",
      };
      const from = parsedMinDate.toLocaleDateString("en-IE", optsShort);
      const to = parsedMaxDate.toLocaleDateString("en-IE", optsShort);

      const minDay = parsedMinDate.toLocaleDateString("en-IE", { day: "numeric" });
      const maxDay = parsedMaxDate.toLocaleDateString("en-IE", { day: "numeric" });

      const minMonth = parsedMinDate.toLocaleDateString("en-IE", { month: "short" });
      const maxMonth = parsedMaxDate.toLocaleDateString("en-IE", { month: "short" });

      const minYear = parsedMinDate.getFullYear()
      const maxYear = parsedMaxDate.getFullYear()

      const monthsEqual = minMonth === maxMonth;
      const yearsEqual = minYear === maxYear;

      if (from === to) {
        // e.g 22 Feb 2022
        return `${from} ${year}`;
      } else if (monthsEqual && yearsEqual) {
        // e.g 22 - 24 Feb 2022

        return `${minDay} - ${maxDay} ${maxMonth} ${minYear}`;
      } else {
        return `${from} ${minYear} - ${to} ${maxYear}`;
      }
    } else {
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
}
