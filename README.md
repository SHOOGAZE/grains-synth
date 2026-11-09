# GRAINS

A granular sampler and playable instrument that runs in the browser. One HTML file, no dependencies, built for touch screens (phones and tablets). Works with MIDI controllers too, and installs as an app that runs offline. Member of a design family with [BEHEMOTH](https://shoogaze.github.io/behemoth-synth-/) and [ELEPHANT](https://shoogaze.github.io/elephant-sequencer/).

**Try it:** open [GRAINS](https://shoogaze.github.io/grains-synth/) on your phone and tap the screen to start audio. On an iPhone or iPad use *Share → Add to Home Screen* for a full-screen app.

Load or record a sound, then play it as a cloud of tiny grains: freeze it, move through it with your finger, modulate it with two LFOs, run it through an arpeggiator or a 16-step sequencer, and record the result.

## Screenshots

Phone upright: GRAIN, TONE, MOD and PLAY tabs, SEQ, the SAMPLE tab, the finger-controlled region editor and the step-by-step tutorial.

<p>
  <img src="screenshots/grain.png" width="24%" alt="Grain: dot-matrix sample view and grain knobs">
  <img src="screenshots/tone.png" width="24%" alt="Tone: scan, filter, echo and space">
  <img src="screenshots/mod.png" width="24%" alt="Mod: two LFOs with targets">
  <img src="screenshots/play.png" width="24%" alt="Play: touch surface and snapshots">
</p>

<p>
  <img src="screenshots/seq.png" width="24%" alt="Seq: scale, arpeggiator and 16-step sequencer">
  <img src="screenshots/sample.png" width="24%" alt="Sample: source, grab and demo sounds">
  <img src="screenshots/edit.png" width="24%" alt="Sample: finger-controlled region editor">
  <img src="screenshots/tutorial.png" width="24%" alt="Step-by-step tutorial">
</p>

Phone held sideways and a tablet: the tabs move to a side rail, the keys stay under the sample.

<p>
  <img src="screenshots/landscape.png" width="49%" alt="Landscape: Grain">
  <img src="screenshots/landscape-play.png" width="49%" alt="Landscape: Play">
</p>
<p>
  <img src="screenshots/landscape-mod.png" width="49%" alt="Landscape: Mod">
  <img src="screenshots/landscape-seq.png" width="49%" alt="Landscape: Seq">
</p>
<p>
  <img src="screenshots/landscape-edit.png" width="49%" alt="Landscape: Sample editor">
  <img src="screenshots/tablet.png" width="24%" alt="Tablet, portrait">
  <img src="screenshots/menu.png" width="24%" alt="The ≡ menu: MIDI, language, display, interface">
</p>

## Features

**Granular engine**
- Grains are scheduled ahead of time on the Web Audio clock: position, spray, size, density, pitch, detune, reverse chance and window shape (rect, Hann, percussive)
- Per-grain windowing and random stereo placement, with automatic gain compensation so dense clouds do not clip
- Scan, lowpass filter with resonance, drive (soft clipping), attack / release envelope, feedback echo, reverb and a master compressor
- Freeze: locks position and scan and sustains the cloud (grain size stays live)

**Sample**
- 6 generated demo sounds (pad, glass, choir, wind, keys, pluck), your own audio files, or the microphone (up to 30 s)
- Finger-controlled editor with a non-destructive loop region: drag the two handles (they snap to zero crossings), swipe to select, pinch to zoom, double-tap to reset the zoom, tap to set the position
- Tools: preview, crop, remove, trim silence, full region, normalize, gain, reverse, fade in / out
- GRAB the last 2, 5 or 10 seconds of what you hear as a new sample
- REC OUT records the output, SAVE WAV exports the current sample; both write 16-bit WAV files and use the share sheet on phones

**Modulation (MOD)**
- Two LFOs: sine, triangle, square, saw, sample and hold; each with its own rate, depth and target (position, spray, size, density, pitch, cutoff, width, reverb)

**Playing**
- Keyboard with hold, octave shift and randomize
- Scale quantization: 8 scales, any root; it also snaps the Y:PITCH axis of the touch surface
- PLAY tab: a full-size touch surface (X = position, Y = spray, size, density, cutoff or pitch) and a gesture recorder that loops your finger movement
- 4 snapshots to jump between sounds, 11 factory presets and your own presets, which you can export and import as a `.json` file
- MIDI input (Web MIDI): notes, pitch bend, sustain pedal, a default CC map and LEARN (tap a knob, then move a controller)

**Arpeggiator and sequencer (SEQ)**
- Arpeggiator: up, down, up-down, random, order; 1 to 3 octaves; note length from 1/4 to 1/32; gate and BPM
- 16-step sequencer with adjustable length; drag in the grid to set the note of each step

**Workflow**
- Undo / redo for parameters, loop region and sample edits
- Knobs: drag to turn, double-tap to reset
- Interface languages: English (default), Russian and Spanish; choose it in ≡ → Language, or pick Auto to follow the browser language
- Step-by-step tutorial on first launch (replay it from ≡ → Play tutorial) and contextual tips on each tab
- Portrait layout for phones, a full-width layout for tablets, landscape console layout (side rail, screens, keys) for wide screens; bar heights match BEHEMOTH and ELEPHANT
- Interface settings: text size and contrast (≡ → Interface)

**Phones and tablets**
- Safe areas and dynamic viewport height for notched phones
- Installable as an app (PWA): fullscreen, works offline once loaded over HTTPS

## Tabs

| Tab | What is there |
| --- | --- |
| GRAIN | Dot-matrix sample view and the main grain knobs |
| TONE | Scan, filter, envelope, echo and reverb |
| MOD | Two LFOs |
| PLAY | Touch surface, Y-axis choice, snapshots, gesture looper |
| SEQ | Scale, arpeggiator, 16-step sequencer |
| SAMPLE | Load, record, grab, demos, editor, export |
| ≡ (top right) | MIDI, language, tips, tutorial, display colour, interface |

## Notes and limits


- Web MIDI works in Chrome and Edge (desktop and Android). It is not available in iOS Safari, where the MIDI card just says so.
- Undo / redo covers parameters, the loop region and sample edits, but not LFO, arpeggiator, sequencer or scale settings.
- Your own samples are not kept after a reload. Presets and settings are saved in the browser.
- GRAB and REC OUT use the ScriptProcessor API, which is deprecated but still supported by current browsers.

## Run

Open `index.html` in a modern browser and tap the screen to start audio.

For install and offline use, serve the files over HTTPS, for example with GitHub Pages.

### GitHub Pages

Settings → Pages → Source: **GitHub Actions** (the included workflow deploys on every push to `main`), or Deploy from branch → `main` / root. The sampler is then available at `https://<user>.github.io/<repo>/`, for this repo [shoogaze.github.io/grains-synth](https://shoogaze.github.io/grains-synth/). On an iPad or iPhone use Share → Add to Home Screen, on Android use the Install app button in the browser menu.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The whole sampler in one file: UI and audio engine. This is the file to open or deploy; it is generated from `src/` |
| `src/index.html` | HTML template (markup and the `<head>`) |
| `src/css/` | Styles, concatenated in file-name order |
| `src/js/` | The engine and UI, split by topic (`02-params`, `10-engine`, `17-sample-editor`, `20-midi` ...) and concatenated in file-name order into one scope |
| `build.mjs` | Builds `index.html` from `src/` (no dependencies) |
| `test/` | Headless Chrome tests (`app.test.mjs`, `ui.test.mjs`) |
| `manifest.webmanifest`, `sw.js`, `icons/` | Install and offline support |
| `screenshots/`, `tools/shots.py` | README screenshots and the script that makes them |
| `.github/workflows/pages.yml` | Builds and deploys to GitHub Pages |
| `LICENSE` | MIT |

## Development

Edit the files in `src/`, then run:

```
node build.mjs     # writes index.html
npm test           # builds a test variant and runs the headless Chrome checks (needs Chrome; set CHROME=/path if it is not "google-chrome")
npx serve .        # local server, needed for the service worker
```

The JS files are joined into a single scope, so their order matters: a file may use what earlier files define. Commit the generated `index.html` too, so the repository can also be opened or deployed without a build step. When you add files to the offline cache in `sw.js`, bump the `V` cache name there.

## Browser support

Current Chrome, Edge, Safari and Firefox. Web MIDI is available in Chromium-based browsers, not in iOS Safari.

## The family

Three instruments in one black-and-white design, each a single HTML file that runs offline. Open them on the same phone or tablet and add the ones you like to the Home Screen.

| App | What it is | Open | Source |
| --- | --- | --- | --- |
| **ELEPHANT** | Pocket sampler groovebox: 16 pads, p-lock sequencer, sampler, FX | [shoogaze.github.io/elephant-sequencer](https://shoogaze.github.io/elephant-sequencer/) | [SHOOGAZE/elephant-sequencer](https://github.com/SHOOGAZE/elephant-sequencer) |
| **BEHEMOTH** | Wavetable bass synthesizer with a modulation matrix | [shoogaze.github.io/behemoth-synth-](https://shoogaze.github.io/behemoth-synth-/) | [SHOOGAZE/behemoth-synth-](https://github.com/SHOOGAZE/behemoth-synth-) |
| **GRAINS** | Granular sampler and playable instrument | [shoogaze.github.io/grains-synth](https://shoogaze.github.io/grains-synth/) | [SHOOGAZE/grains-synth](https://github.com/SHOOGAZE/grains-synth) |

## License

[MIT](LICENSE). Copyright (c) 2026 Kirill Kinderhart.
