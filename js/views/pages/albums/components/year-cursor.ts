import { html } from "../../../../library/lit.js";
import { LitElem } from "../../../../models/lit-element.ts";

export class YearCursor extends LitElem {
  datesCache: {
    position: DOMRect;
    minDate: number;
  }[];

  constructor() {
    super();
    this._onScroll = this._onScroll.bind(this);
    this._clearCacheOnResize = this._clearCacheOnResize.bind(this);
    this.datesCache = [];
  }

  _onScroll() {
    const yearCursor = document.getElementById("year-cursor");
    if (window.scrollY < 200) {
      if (yearCursor) {
        yearCursor.style.display = "none";
      }
      return;
    } else if (yearCursor) {
      yearCursor.style.display = "block";
    }

    const dates = this.getDates();

    let firstBelowPositionHeight: number|undefined = undefined;
    const row: {
      position: DOMRect;
      minDate: number;
    }[] = [];

    // efficiently get the dates below the current window position;
    // collect a list of ones on the same row
    for (let idx = 0; idx < dates.length; idx++) {
      if (dates[idx].position.top > window.scrollY) {
        if (!firstBelowPositionHeight) {
          firstBelowPositionHeight = dates[idx].position.top;
          row.push(dates[idx]);
        }

        if (dates[idx].position.top === firstBelowPositionHeight) {
          row.push(dates[idx]);
        } else {
          break;
        }
      }
    }

    const minimumDate = Math.min(...row.map(item => item.minDate));
    const dateSummary = new Date(minimumDate);
    const monthYearString = dateSummary.toLocaleString('default', { month: 'short', year: 'numeric' });

    if (yearCursor && monthYearString !== 'Invalid Date') {
      yearCursor.textContent = monthYearString;
    }
  }

  _clearCacheOnResize() {
    this.datesCache = [];
  }

  getDates() {
    if (this.datesCache.length > 0) {
      return this.datesCache;
    }
    const $dates = document.querySelectorAll(".photo-album-date");
    const details = Array.from($dates).flatMap((date: Element) => {
      const minDate = date.getAttribute('data-min-date');

      if (!minDate) {
        return []
      }
      return [{
        position: date.getBoundingClientRect(),
        minDate: parseInt(minDate, 10)
      }]
    });

    this.datesCache = details;
    return this.datesCache;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('scroll', this._onScroll, {passive: true});
    window.addEventListener("resize", this._clearCacheOnResize, {passive: true})
  }

  override disconnectedCallback(): void {
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('scroll', this._clearCacheOnResize);
  }

  render() {
    return html`<div id="year-cursor"></div>`;
  }
}

customElements.define("year-cursor", YearCursor);
