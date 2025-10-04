
npx esbuild ts/index.ts \
  --bundle                  \
  --outfile=dist_fork/js/app.js  \
  --format=esm              \
  --minify                  \
  --sourcemap

npx esbuild css/style.css      \
  --bundle                     \
  --loader:.ttf=file           \
  --loader:.woff2=file         \
  --outfile=dist_fork/css/style.css
