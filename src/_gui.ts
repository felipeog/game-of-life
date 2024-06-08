import GUI from "lil-gui";

import { animate, getCssRgbFromColorObject, render } from "./_rendering.js";
import { context, wrapper } from "./_elements.js";
import { createEmptyGeneration, createRandomGeneration } from "./_game.js";
import { LOCAL_STORAGE_KEY } from "./_constants.js";
import { state } from "./_state.js";

const gui = new GUI();
gui.title("Game of Life");

export function createGui() {
  const initialState = structuredClone(state);
  const properties = {
    background: initialState.color.background,
    foreground: initialState.color.foreground,
    generationsPerSecond: initialState.generationsPerSecond,
    hasTrail: initialState.hasTrail,
    trailAlpha: initialState.trailAlpha,
    isRounded: initialState.isRounded,
    radius: initialState.radius,
    random() {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      state.generation = createRandomGeneration();
      context.fillStyle = getCssRgbFromColorObject(state.color.background);
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      requestAnimationFrame((time) => render({ time }));
      animate();
    },
    gosperGliderGun() {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      const generation = createEmptyGeneration();

      generation[0][24] = 1;
      generation[1][22] = 1;
      generation[1][24] = 1;
      generation[2][12] = 1;
      generation[2][13] = 1;
      generation[2][20] = 1;
      generation[2][21] = 1;
      generation[2][34] = 1;
      generation[2][35] = 1;
      generation[3][11] = 1;
      generation[3][15] = 1;
      generation[3][20] = 1;
      generation[3][21] = 1;
      generation[3][34] = 1;
      generation[3][35] = 1;
      generation[4][0] = 1;
      generation[4][1] = 1;
      generation[4][10] = 1;
      generation[4][16] = 1;
      generation[4][20] = 1;
      generation[4][21] = 1;
      generation[5][0] = 1;
      generation[5][1] = 1;
      generation[5][10] = 1;
      generation[5][14] = 1;
      generation[5][16] = 1;
      generation[5][17] = 1;
      generation[5][22] = 1;
      generation[5][24] = 1;
      generation[6][10] = 1;
      generation[6][16] = 1;
      generation[6][24] = 1;
      generation[7][11] = 1;
      generation[7][15] = 1;
      generation[8][12] = 1;
      generation[8][13] = 1;

      state.generation = generation;
      context.fillStyle = getCssRgbFromColorObject(state.color.background);
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      requestAnimationFrame((time) => render({ time }));
      animate();
    },
    empty() {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      state.generation = createEmptyGeneration();
      context.fillStyle = getCssRgbFromColorObject(state.color.background);
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      requestAnimationFrame((time) => render({ time }));
      animate();
    },
    playPause() {
      if (state.animateTimeoutId) {
        clearTimeout(state.animateTimeoutId);
        state.animateTimeoutId = null;
      } else {
        animate();
      }
    },
    reset() {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

      gui.reset();
      savePreset();

      for (const controller of gui.controllersRecursive()) {
        if (
          controller.property === "foreground" ||
          controller.property === "background"
        ) {
          state.color[controller.property] = { ...controller.initialValue };
        }
      }

      wrapper.style.backgroundColor = getCssRgbFromColorObject(
        state.color.background
      );
      context.fillStyle = getCssRgbFromColorObject(state.color.background);
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      requestAnimationFrame((time) => render({ time }));
      animate();
    },
  };

  const patternFolder = gui.addFolder("Pattern");
  patternFolder.add(properties, "random").name("Random");
  patternFolder.add(properties, "gosperGliderGun").name("Gosper glider gun");
  patternFolder.add(properties, "empty").name("Empty");

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

function loadPreset() {
  const presetInLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!presetInLocalStorage) return;

  try {
    const preset = JSON.parse(presetInLocalStorage);

    gui.load(preset);
  } catch (error) {
    console.error("error loading preset", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

function savePreset() {
  const preset = gui.save();

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preset));
}
