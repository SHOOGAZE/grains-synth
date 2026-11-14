# Changelog

## Unreleased
- Unified OLED panel (caption, dot-matrix name with Cyrillic, scope) shared by GRAINS, ELEPHANT and BEHEMOTH.

## 1.1.0 (2026-11-13)

- Interface levels: Simple (default) shows GRAIN, TONE and PLAY; Full adds MOD, SEQ and SAMPLE. The tour follows the level.
- Take undo for gesture recording (↶ TAKE).
- Black-and-white glass look on the screens, shared with BEHEMOTH and ELEPHANT.
- Tablet upright: tone knobs sit two by two and stay finger sized.
- Narrow and folded phones: the dock row always shows the octave buttons, also in Russian.
- Safety limiter on the output: nothing above full scale reaches the speakers or a recording.
- Audio wakes up again after a phone call, a locked screen or a switch to another app.
- Knobs are sliders for the keyboard and screen readers; tabs are marked as tabs.
- Larger captions (10px minimum on knobs and tabs), 44px touch areas on header buttons.
- Sheets close with one compact ✕ button.
- CI: build check, app tests and UI tests on every push.
- Tests: audio fuzz test in the browser (random knobs and notes, the output is watched for NaN and clipping); runs in CI.
