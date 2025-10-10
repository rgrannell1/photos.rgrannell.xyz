
npx esbuild ts/index.ts \
  --bundle                  \
  --outfile=dist_fork/js/app.js  \
  --format=esm              \
  --sourcemap

npx esbuild css2/style.css      \
  --bundle                     \
  --loader:.ttf=file           \
  --loader:.woff2=file         \
  --outfile=dist_fork/css/style.css
