set -e
SRC="${1:-doc/src/index.ts}"
../gettypes/bin/gettypes.js "$SRC" > data.json
node builddocs.js "$SRC" > data.html
