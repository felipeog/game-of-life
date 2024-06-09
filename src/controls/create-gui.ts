import { animate } from "../rendering/animate";
import { context } from "../elements/context";
import { emptyGeneration } from "./empty-generation";
import { getCssRgbFromColorObject } from "../rendering/get-css-from-color-object";
import { gosperGliderGun } from "./gosper-glider-gun";
import { gui } from "./gui";
import { loadPreset } from "./load-preset";
import { playPause } from "./play-pause";
import { randomGeneration } from "./random-generation";
import { render } from "../rendering/render";
import { reset } from "./reset";
import { savePreset } from "./save-preset";
import { state } from "../state";
import { wrapper } from "../elements/wrapper";

export function createGui() {
  gui.title("Game of Life");

  const initialState = structuredClone(state);
  const properties = {
    background: initialState.color.background,
    foreground: initialState.color.foreground,
    generationsPerSecond: initialState.generationsPerSecond,
    hasTrail: initialState.hasTrail,
    trailAlpha: initialState.trailAlpha,
    isRounded: initialState.isRounded,
    radius: initialState.radius,
    randomGeneration,
    gosperGliderGun,
    emptyGeneration,
    playPause,
    reset,
  };

  const patternFolder = gui.addFolder("Pattern");
  patternFolder.add(properties, "randomGeneration").name("Random");
  patternFolder.add(properties, "gosperGliderGun").name("Gosper glider gun");
  patternFolder.add(properties, "emptyGeneration").name("Empty");

  const appearanceFolder = gui.addFolder("Appearance");
  appearanceFolder
    .addColor(properties, "background", 255)
    .name("Background color")
    .onFinishChange((value: Color) => {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      state.color.background = { ...value };
      wrapper.style.backgroundColor = getCssRgbFromColorObject(
        state.color.background
      );
      context.fillStyle = getCssRgbFromColorObject(state.color.background);
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      requestAnimationFrame((time) => render({ time }));
      animate();
    });
  appearanceFolder
    .addColor(properties, "foreground", 255)
    .name("Foreground color")
    .onFinishChange((value: Color) => {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      state.color.foreground = { ...value };
      context.fillStyle = getCssRgbFromColorObject(state.color.background);
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      requestAnimationFrame((time) => render({ time }));
      animate();
    });
  appearanceFolder
    .add(properties, "hasTrail")
    .name("Trail")
    .onFinishChange((value: boolean) => {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      state.hasTrail = value;

      requestAnimationFrame((time) => render({ time }));
      animate();
    });
  appearanceFolder
    .add(properties, "trailAlpha", 0, 1, 0.05)
    .name("Trail opacity")
    .onFinishChange((value: number) => {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      state.trailAlpha = 1 - value;
      context.fillStyle = getCssRgbFromColorObject(state.color.background);
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      requestAnimationFrame((time) => render({ time }));
      animate();
    });
  appearanceFolder
    .add(properties, "isRounded")
    .name("Rounded")
    .onFinishChange((value: boolean) => {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      state.isRounded = value;
      context.fillStyle = getCssRgbFromColorObject(state.color.background);
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      requestAnimationFrame((time) => render({ time }));
      animate();
    });
  appearanceFolder
    .add(properties, "radius", 0, 0.5, 0.05)
    .name("Radius")
    .onFinishChange((value: number) => {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      state.radius = value;
      context.fillStyle = getCssRgbFromColorObject(state.color.background);
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      requestAnimationFrame((time) => render({ time }));
      animate();
    });
  appearanceFolder.add(properties, "reset").name("Reset");

  const gameFolder = gui.addFolder("Game");
  gameFolder
    .add(properties, "generationsPerSecond", 1, 30, 1)
    .name("Generations per second")
    .onFinishChange((value: number) => {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      state.generationsPerSecond = value;

      animate();
    });
  gameFolder.add(properties, "playPause").name("Play/Pause");

  loadPreset();
  gui.onFinishChange(savePreset);
}
