#!/bin/bash
# Render all 10 gig explainer videos
set -e

for i in 1 2 3 4 5 6 7 8 9 10; do
  echo "═══ Rendering Gig $i ═══"
  npx remotion render src/index.ts "Gig${i}" "out/gig-${i}-video.mp4"
  echo "✓ Gig $i done"
done

echo ""
echo "All 10 videos rendered!"
ls -lh out/gig-*-video.mp4
