/* Page resolution state tests. */

import m from "mithril";
import { isNone } from "../ts/commons/maybe.ts";
import { pageEntry } from "../ts/app/shell.ts";

const TestPage: m.Component<{ label: string }> = {
  view: (vnode) => vnode.attrs.label,
};

Deno.test("pageEntry returns a ready page result", () => {
  const entry = pageEntry({
    page: TestPage,
    resolve: () => ({ attrs: { label: "ready" } }),
  });
  const result = entry.resolve();

  if (isNone(result) || !result.ok || result.value.attrs.label !== "ready") {
    throw new Error("expected a ready page");
  }
});

Deno.test("pageEntry returns an error result", () => {
  const entry = pageEntry({ page: TestPage, resolve: () => "missing" });
  const result = entry.resolve();

  if (isNone(result) || result.ok || result.error !== "missing") {
    throw new Error("expected a page error");
  }
});

Deno.test("pageEntry returns NONE while loading", () => {
  const entry = pageEntry({ page: TestPage, resolve: () => "" });
  if (!isNone(entry.resolve())) {
    throw new Error("expected a loading page");
  }
});
