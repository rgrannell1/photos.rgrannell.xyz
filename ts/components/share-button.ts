import m from "mithril";
import { canNativeShare, nativeShare } from "../services/window.ts";

type ShareButtonAttrs = {
  url: string;
  name: string;
};

/* */
async function share(
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

function viewShareButton(
  localState: { sharing: boolean },
  vnode: m.Vnode<ShareButtonAttrs>,
): m.Children {
  const { url, name } = vnode.attrs;

  // without the share API (desktop), link straight to the sharephoto domain
  if (!canNativeShare()) {
    return m("a.photo-share-button", { href: url, rel: "noreferrer" }, "[share]");
  }

  return m("button.photo-share-button", {
    onclick: share.bind(null, localState, url, name),
  }, buttonText(localState));
}

/*
 * The [share] control used by album, trip, and thing pages. Links to the
 * sharephoto domain on desktop; opens the native share sheet on mobile.
 */
export function ShareButton() {
  const localState = {
    sharing: false,
  };

  return { view: viewShareButton.bind(null, localState) };
}
