/*
 * /#/about
 *
 * The website's about page. Displays basic information about licensing
 */

import { html } from "lit-element";

import "../components/photo.ts";
import { JSONFeed } from "../../services/json-feed.ts";
import { LitElem } from "../../models/lit-element.ts";

export class AboutPage extends LitElem {
  override connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
    document.title = "About - photos";
  }

  render() {
    return html`
    <div>
      <section class="about-page">
        <h1>About</h1>

        <p>I started taking photos back in 2012, and have taken a lot of photos since. I've become, in my opinion, a reasonable wildlife photographer (though hit-or-miss at other styles of photography). I built this website to share the things <a href="https://photos.rgrannell.xyz/#/thing/rating:⭐⭐⭐⭐⭐">I found beautiful in this world.</a></p>

        <h2>Can I use the photos on this site?</h2>

        <p>You may use this website and its content for personal, non-commerical purposes only. For example, using photos as a desktop wallpaper is fine, selling these photos is not.</p>

        <h2>Can I use data from this site to train AI?</h2>

        <p>No, absolutely not. The <a href="http://photos.rgrannell.xyz/robots.txt">robots.txt</a> file for this site explicitly prohibits this.</p>

        <h2>What is your contact information?</h2>

        <p>See <a href="https://rgrannell.xyz/">my personal site</a> for contact details.</p>

        </section>
    </div>
    `;
  }
}

customElements.define("about-page", AboutPage);
