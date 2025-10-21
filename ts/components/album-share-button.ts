import m from "mithril";

type AlbumShareButtonAttrs = {
  url: string;
  name: string;
};

/*
 *
 */
function handleError(message: string) {
  if (message.includes("Shared canceled")) {
    return;
  }
  alert(message);
}

/*
 *
 */
async function shareAlbum(
  state: { sharing: boolean },
  url: string,
  name: string,
) {
  if (!navigator.share) {
    handleError("navigator.share not available");
    return;
  }

  try {
    await navigator.share({
      title: `${name} - photos.rgrannell.xyz`,
      url,
    });
  } catch (error) {
    console.error("Error sharing:", error);
  } finally {
    state.sharing = false;
  }
}

/*
 *
 */
function buttonText(state: { sharing: boolean }) {
  return state.sharing ? "[sharing...]" : "[share]";
}

/*
 *
 */
export function AlbumShareButton() {
  const localState = {
    sharing: false,
  };

  return {
    view(vnode: m.Vnode<AlbumShareButtonAttrs>) {
      const { url, name } = vnode.attrs;

      return m("button.photo-share-button", {
        disabled: !navigator.share,
        onclick: shareAlbum.bind(null, localState, url, name),
      }, buttonText(localState));
    },
  };
}
