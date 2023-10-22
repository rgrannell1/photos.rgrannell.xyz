
import { LitElement, html } from "../../../../library/lit.js";

export class PhotoAlbums extends LitElement {
  createRenderRoot() {
    return this;
  }
  data() {
    return [
      {
        title: 'Cork',
        url: 'https://picsum.photos/200/200',
        id: 1,
        count: 10
      },
      {
        title: 'Dublin',
        url: 'https://picsum.photos/200/200',
        id: 2,
        count: 20
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 310
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 3
      },
      {
        title: 'Cork',
        url: 'https://picsum.photos/200/200',
        id: 1,
        count: 11
      },
      {
        title: 'Dublin',
        url: 'https://picsum.photos/200/200',
        id: 2,
        count: 21
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 1
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Cork',
        url: 'https://picsum.photos/200/200',
        id: 1,
        count: 10
      },
      {
        title: 'Dublin',
        url: 'https://picsum.photos/200/200',
        id: 2,
        count: 20
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      },
      {
        title: 'Galway',
        url: 'https://picsum.photos/200/200',
        id: 3,
        count: 30
      }
    ];
  }

  render() {
    return html`
    <section class="album-container">
      ${
        this.data().map((album) => {
          return html`
          <photo-album
            title="${album.title}" url="${album.url}"
            id="${album.id}" count="${album.count}"></photo-album>
          `
        })
      }
    </section>
    `
  }
}

customElements.define('photo-albums', PhotoAlbums);
