import m from "mithril";

type ShareButtonAttrs = {
  url: string;
  format: string;
};

/* */
function handleError(message: string) {
  if (message.includes("Shared canceled")) {
    return;
  }
  alert(message);
}

/* */
async function shareImage(
  state: { sharing: boolean },
  url: string,
  format: string,
) {
  if (!navigator.share) {
    handleError("navigator.share not available");
    return;
  }

  state.sharing = true;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      handleError(`failed to fetch image! status: ${response.status}`);
      return;
    }

    const blob = await response.blob();
    const file = new File([blob], "image", { type: format });
    const shareData: ShareData = {
      files: [file],
      title: "Sharing Image",
    };

    if (!navigator.canShare?.(shareData)) {
      await navigator.share({
        title: "Sharing Image",
        url,
      });

      return;
    }

    await navigator.share(shareData);
  } catch (error) {
    handleError("Error sharing image" + error);
  } finally {
    state.sharing = false;
  }
}

/* */
function buttonText(state: { sharing: boolean }) {
  return state.sharing ? "[sharing...]" : "[share]";
}

/* */
export function PhotoShareButton() {
  const localState = {
    sharing: false,
  };

  return {
    view(vnode: m.Vnode<ShareButtonAttrs>) {
      const { url, format } = vnode.attrs;

      return m("button.photo-share-button", {
        disabled: !navigator.share,
        onclick: shareImage.bind(null, localState, url, format),
      }, buttonText(localState));
    },
  };
}
