import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm";
import {
  animate,
  createEmptyGeneration,
  createRandomGeneration,
} from "./_functions.js";
import { state } from "./_state.js";
import { LOCAL_STORAGE_KEY } from "./_constants.js";

export function createGui() {
  const gui = new GUI();
  const properties = {
    random() {
      const randomGeneration = createRandomGeneration();

      state.generations = [randomGeneration];
    },
    gosperGliderGun() {
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

      state.generations = [generation];
    },
    generationsPerSecond: state.generationsPerSecond,
    savePreset() {
      const preset = gui.save();

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preset));
      loadPresetButton.enable();
    },
    loadPreset() {
      if (!localStorage.getItem(LOCAL_STORAGE_KEY)) return;

      try {
        const preset = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

        gui.load(preset);
      } catch (error) {
        loadPresetButton.disable();
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        console.error(error);
      }
    },
  };

  gui.add(properties, "random").name("Random");

  gui.add(properties, "gosperGliderGun").name("Gosper glider gun");

  gui
    .add(properties, "generationsPerSecond", 1, 30, 1)
    .name("Generations per second")
    .onFinishChange((value) => {
      if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);
      state.generationsPerSecond = value;
      animate();
    });

  gui.add(properties, "savePreset").name("Save preset");

  const loadPresetButton = gui
    .add(properties, "loadPreset")
    .name("Load preset")
    .disable(!localStorage.getItem(LOCAL_STORAGE_KEY));
}
