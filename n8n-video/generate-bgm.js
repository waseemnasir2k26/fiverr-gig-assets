// Generate a gentle ambient pad background music as WAV
// Royalty-free — procedurally generated
const fs = require("fs");
const path = require("path");

const SAMPLE_RATE = 44100;
const DURATION = 40; // seconds
const NUM_SAMPLES = SAMPLE_RATE * DURATION;
const NUM_CHANNELS = 2; // stereo

// Musical notes (Hz) — Cmaj7 + Am7 chord progression for ambient feel
const chords = [
  [261.63, 329.63, 392.0, 493.88], // Cmaj7: C4 E4 G4 B4
  [220.0, 261.63, 329.63, 392.0],  // Am7: A3 C4 E4 G4
  [246.94, 311.13, 369.99, 440.0], // Bmb5: B3 Eb4 Gb4 A4 (diminished feel)
  [196.0, 246.94, 293.66, 369.99], // Gmaj7-ish: G3 B3 D4 Gb4
];

function lerp(a, b, t) { return a + (b - a) * t; }

// Soft sine pad with slow attack/release
function generateSample(t, totalDuration) {
  const chordDuration = totalDuration / chords.length;
  const chordIndex = Math.min(Math.floor(t / chordDuration), chords.length - 1);
  const nextChordIndex = Math.min(chordIndex + 1, chords.length - 1);
  const chordProgress = (t % chordDuration) / chordDuration;

  // Crossfade between chords
  const crossfade = chordProgress > 0.85 ? (chordProgress - 0.85) / 0.15 : 0;

  let sample = 0;

  // Current chord
  for (const freq of chords[chordIndex]) {
    // Gentle detuned sine waves for warmth
    sample += Math.sin(2 * Math.PI * freq * t) * 0.12 * (1 - crossfade);
    sample += Math.sin(2 * Math.PI * freq * 1.002 * t) * 0.06 * (1 - crossfade); // slight detune
  }

  // Next chord (crossfade in)
  if (crossfade > 0) {
    for (const freq of chords[nextChordIndex]) {
      sample += Math.sin(2 * Math.PI * freq * t) * 0.12 * crossfade;
      sample += Math.sin(2 * Math.PI * freq * 1.002 * t) * 0.06 * crossfade;
    }
  }

  // Add very subtle sub bass
  const bassFreq = chords[chordIndex][0] / 2;
  sample += Math.sin(2 * Math.PI * bassFreq * t) * 0.08;

  // Slow LFO for movement (tremolo)
  const lfo = 0.85 + 0.15 * Math.sin(2 * Math.PI * 0.15 * t);
  sample *= lfo;

  // Gentle fade in (2s) and fade out (3s)
  if (t < 2) sample *= t / 2;
  if (t > totalDuration - 3) sample *= (totalDuration - t) / 3;

  // Soft clip
  sample = Math.tanh(sample * 1.5) * 0.5;

  return sample;
}

// Generate stereo samples
const leftChannel = new Float32Array(NUM_SAMPLES);
const rightChannel = new Float32Array(NUM_SAMPLES);

for (let i = 0; i < NUM_SAMPLES; i++) {
  const t = i / SAMPLE_RATE;
  const mono = generateSample(t, DURATION);

  // Subtle stereo width — slight phase offset
  const stereoOffset = Math.sin(2 * Math.PI * 0.05 * t) * 0.02;
  leftChannel[i] = mono * (1 + stereoOffset);
  rightChannel[i] = mono * (1 - stereoOffset);
}

// Write WAV file
function writeWav(filePath, left, right, sampleRate) {
  const numSamples = left.length;
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = NUM_CHANNELS * bytesPerSample;
  const dataSize = numSamples * blockAlign;
  const headerSize = 44;
  const buffer = Buffer.alloc(headerSize + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(headerSize + dataSize - 8, 4);
  buffer.write("WAVE", 8);

  // fmt chunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // chunk size
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(NUM_CHANNELS, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * blockAlign, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data chunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const l = Math.max(-1, Math.min(1, left[i]));
    const r = Math.max(-1, Math.min(1, right[i]));
    buffer.writeInt16LE(Math.round(l * 32767), offset);
    buffer.writeInt16LE(Math.round(r * 32767), offset + 2);
    offset += 4;
  }

  fs.writeFileSync(filePath, buffer);
  console.log(`WAV written: ${filePath} (${(buffer.length / 1024 / 1024).toFixed(1)} MB)`);
}

const outPath = path.join(__dirname, "public", "bgm.wav");
writeWav(outPath, leftChannel, rightChannel, SAMPLE_RATE);
console.log("Done! Ambient background music generated.");
