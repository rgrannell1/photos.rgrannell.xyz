@/home/rg/Agents/AGENTS.md
@/home/rg/Agents/agents.deno.md
@/home/rg/Agents/agents.webdev.md
@/home/rg/Code/websites/photos.rgrannell.xyz/design.md

## bs/ scripts

- `bs/lint.sh` — type-check with `tsc --noEmit`
- `bs/build.sh` — full build (CSS, JS, tribbles)
- `bs/dev.sh` / `bs/dev:watch.sh` — local dev server (port 3030; `rs dev` starts a live-reload socket)
- `bs/test.sh` — run tests
- `bs/deploy.sh` — deploy to production

## CI

- CI checks out the repo and serves the committed `dist/` directly — no build step runs in CI
- Any TypeScript change must be accompanied by a rebuilt `dist/` in the same commit, or CI tests will fail against stale assets

## Project

- run `rs build` to build
- add ui functionality as mithril components
- add CSS to the css file
- `/home/rg/Code/mirror` is the photo processing workflow that publishes here. The triples which back the photo website are created here. It has photos.md, albums.md, things.toml that define most semantic information; some is derived in the python workflow

## Architecture constraints

- Pages and route entries must not import TribbleDB reader functions directly; all data access goes through `state.services`. Add any new reader to `loadServices` in `ts/state.ts` and call it via services. Pure helpers over already-read values (e.g `albumYear`, `encodeBitmapDataURL`, `loadingMode`) may be imported directly.
