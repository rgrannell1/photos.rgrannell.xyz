import m from "mithril";
import { canNativeShare, nativeShare } from "../../services/window.ts";

type AlbumShareButtonAttrs = {
  url: string;
  name: string;
};

/* */
async function shareAlbum(
  localState: { sharing: boolean },
  url: string,
  name: string,
): Promise<void> {
  await nativeShare(localState, url, name);
  m.redraw();
}

/* */
function buttonText(localState: { sharing: boolean }) {
  return localState.sharing ? "[sharing...]" : "[share]";
}

function viewAlbumShareButton(
  localState: { sharing: boolean },
  vnode: m.Vnode<AlbumShareButtonAttrs>,
): m.Children {
  const { url, name } = vnode.attrs;

  // without the share API (desktop), link straight to the sharephoto domain
  if (!canNativeShare()) {
    return m("a.photo-share-button", { href: url, rel: "noreferrer" }, "[share]");
  }

  return m("button.photo-share-button", {
    onclick: shareAlbum.bind(null, localState, url, name),
  }, buttonText(localState));
}

/* */
export function AlbumShareButton() {
  const localState = {
    sharing: false,
  };

  return { view: viewAlbumShareButton.bind(null, localState) };
}
