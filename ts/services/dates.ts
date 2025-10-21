export class Dates {
  /*
  *
  */
  static parse(dateTime: string): Date {
    let [date, time] = dateTime.split(" ");
    date = date.replace(/:/g, "-");

    return new Date(`${date} ${time}`);
  }
  /*
  *
  */
  static formatExifDate(dateTime: string): string {
    if (!dateTime) {
      return dateTime;
    }

    const createdAt = new Date(dateTime).toISOString();
    const [date, time] = createdAt.split("T")[0].replace(/\:/g, "-");

    return `${date.replace(/\:/g, "/")} ${time}`;
  }
  /*
  *
  */
  static formatCreatedAt(dateTime: string): string {
    const date = new Date(parseInt(dateTime));
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }
  /*
  *
  */
  static dateRange(
    minDate: Date | string,
    maxDate: Date | string,
    smallDevice: boolean,
  ): string {
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
      const optsShort: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
      };
      const from = parsedMinDate.toLocaleDateString("en-IE", optsShort);
      const to = parsedMaxDate.toLocaleDateString("en-IE", optsShort);

      const minDay = parsedMinDate.toLocaleDateString("en-IE", {
        day: "numeric",
      } as Intl.DateTimeFormatOptions);
      const maxDay = parsedMaxDate.toLocaleDateString("en-IE", {
        day: "numeric",
      } as Intl.DateTimeFormatOptions);

      const minMonth = parsedMinDate.toLocaleDateString("en-IE", {
        month: "short",
      } as Intl.DateTimeFormatOptions);
      const maxMonth = parsedMaxDate.toLocaleDateString("en-IE", {
        month: "short",
      } as Intl.DateTimeFormatOptions);

      const minYear = parsedMinDate.getFullYear();
      const maxYear = parsedMaxDate.getFullYear();

      const monthsEqual = minMonth === maxMonth;
      const yearsEqual = minYear === maxYear;

      if (from === to) {
        // e.g 22 Feb 2022
        return `${from} ${minYear}`;
      } else if (monthsEqual && yearsEqual) {
        // e.g 22 - 24 Feb 2022

        return `${minDay} - ${maxDay} ${maxMonth} ${minYear}`;
      } else {
        return `${from} ${minYear} - ${to} ${maxYear}`;
      }
    } else {
      const opts: Intl.DateTimeFormatOptions = {
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
