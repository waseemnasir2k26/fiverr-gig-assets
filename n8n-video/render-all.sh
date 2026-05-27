#!/bin/bash
# Render all 42 gig explainer videos
set -e

for i in $(seq 1 42); do
  echo "═══ Rendering Gig $i ═══"
  npx remotion render src/index.ts "Gig${i}" "out/gig-${i}-video.mp4"
  echo "✓ Gig $i done"
done

echo ""
echo "All 42 videos rendered!"
ls -lh out/gig-*-video.mp4
