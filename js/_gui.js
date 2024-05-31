import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm";
import { createRandomGeneration } from "./_functions.js";
import { state } from "./_state.js";

export function createGui() {
  const gui = new GUI();

  gui.close();
  gui
    .add(
      {
        reset() {
          const randomGeneration = createRandomGeneration();
          state.generations = [randomGeneration];
        },
      },
      "reset"
    )
    .name("Reset");
}
