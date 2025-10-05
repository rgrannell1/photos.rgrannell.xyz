import m from "mithril";

export function AboutPage() {
  return {
    oninit() {
      document.title = "About - photos";
    },
    view() {
      return m("div", [
        m("section.about-page", [
          m("h1", "About"),
          m(
            "p",
            "I started taking photos back in 2012, and have taken a lot of photos since. I've become, in my opinion, a reasonable wildlife photographer (though hit-or-miss at other styles of photography). I built this website to share the things ",
            m("a", {
              href: "https://photos.rgrannell.xyz/#/thing/rating:⭐⭐⭐⭐⭐",
            }, "I found beautiful in this world."),
          ),
          m("h2", "Can I use the photos on this site?"),
          m(
            "p",
            "You may use this website and its content for personal, non-commerical purposes only. For example, using photos as a desktop wallpaper is fine, selling these photos is not.",
          ),
          m("h2", "Can I use data from this site to train AI?"),
          m(
            "p",
            "No, absolutely not. The ",
            m(
              "a",
              { href: "http://photos.rgrannell.xyz/robots.txt" },
              "robots.txt",
            ),
            " file for this site explicitly prohibits this.",
          ),
          m("h2", "What is your contact information?"),
          m(
            "p",
            "See ",
            m("a", { href: "https://rgrannell.xyz/" }, "my personal site"),
            " for contact details.",
          ),
        ]),
      ]);
    },
  };
}
