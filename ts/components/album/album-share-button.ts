import m from "mithril";

type AlbumShareButtonAttrs = {
  url: string;
  name: string;
};

/* */
async function shareAlbum(
  state: { sharing: boolean },
  url: string,
  name: string,
) {
  try {
    await navigator.share({
      title: `${name} - ${window.location.hostname}`,
      url,
    });
  } catch (error) {
    console.error("Error sharing:", error);
  } finally {
    state.sharing = false;
  }
}

/* */
function buttonText(state: { sharing: boolean }) {
  return state.sharing ? "[sharing...]" : "[share]";
}

/* */
export function AlbumShareButton() {
  const localState = {
    sharing: false,
  };

  return {
    view(vnode: m.Vnode<AlbumShareButtonAttrs>) {
      const { url, name } = vnode.attrs;

      // without the share API (desktop), link straight to the sharephoto domain
      if (!navigator.share) {
        return m("a.photo-share-button", { href: url, rel: "noreferrer" }, "[share]");
      }

      return m("button.photo-share-button", {
        onclick: shareAlbum.bind(null, localState, url, name),
      }, buttonText(localState));
    },
  };
}
