import m from "mithril";
import { canNativeShare, nativeShare } from "../services/browser/window.ts";

type ShareButtonAttrs = {
  url: string;
  name: string;
};

async function share(
  localState: { sharing: boolean },
  url: string,
  name: string,
): Promise<void> {
  await nativeShare(localState, url, name);
  m.redraw();
}

function buttonText(localState: { sharing: boolean }) {
  return localState.sharing ? "[sharing...]" : "[share]";
}

function drawShareLink(url: string): m.Children {
  return m("a.photo-share-button", { href: url, rel: "noreferrer" }, "[share]");
}

function drawNativeShareButton(
  localState: { sharing: boolean },
  url: string,
  name: string,
): m.Children {
  const onclick = share.bind(null, localState, url, name);
  const text = buttonText(localState);
  return m("button.photo-share-button", { onclick }, text);
}

function viewShareButton(
  localState: { sharing: boolean },
  vnode: m.Vnode<ShareButtonAttrs>,
): m.Children {
  const { url, name } = vnode.attrs;

  // without the share API (desktop), link straight to the sharephoto domain
  if (!canNativeShare()) {
    return drawShareLink(url);
  }

  return drawNativeShareButton(localState, url, name);
}

/* The [share] control used by album, trip, and thing pages. */
export function ShareButton() {
  const localState = {
    sharing: false,
  };

  return { view: viewShareButton.bind(null, localState) };
}
