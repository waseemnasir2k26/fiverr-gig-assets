#!/bin/bash
# Render the 11 missing gig explainer videos (18-32 range).
set -e
for i in 19 21 22 23 25 26 27 28 29 31 32; do
  echo "=== Rendering Gig $i ==="
  node node_modules/@remotion/cli/remotion-cli.js render src/index.ts "Gig${i}" "out/gig-${i}-video.mp4" --log=error
  echo "OK Gig $i"
done
echo "All 11 rendered."
