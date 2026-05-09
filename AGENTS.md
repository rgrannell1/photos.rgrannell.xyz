@/home/rg/Agents/AGENTS.md
@/home/rg/Agents/agents.deno.md
@/home/rg/Code/websites/photos.rgrannell.xyz/design.md

## bs/ scripts

- `bs/lint.sh` — type-check with `tsc --noEmit`
- `bs/build.sh` — full build (CSS, JS, tribbles)
- `bs/dev.sh` / `bs/dev:watch.sh` — local dev server (port 3030; `rs dev` starts a live-reload socket)
- `bs/test.sh` — run tests
- `bs/deploy.sh` — deploy to production

## Git

- Before committing, always ask the user to confirm the feature works visually — do not proceed to commit until they confirm

## Project

- run `rs build` to build
- add ui functionality as mithril components
- add CSS to the css file
- `/home/rg/Code/mirror` is the photo processing workflow that publishes here. The triples which back the photo website are created here. It has photos.md, albums.md, things.toml that define most semantic information; some is derived in the python workflow
