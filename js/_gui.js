import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm";
import { createEmptyGeneration, createRandomGeneration } from "./_functions.js";
import { state } from "./_state.js";

export function createGui() {
  const gui = new GUI();

  gui.close();
  gui
    .add(
      {
        callback() {
          const randomGeneration = createRandomGeneration();

          state.generations = [randomGeneration];
        },
      },
      "callback"
    )
    .name("Random");
  gui
    .add(
      {
        callback() {
          const gosperGliderGun = createEmptyGeneration();

          gosperGliderGun[0][24] = 1;

          gosperGliderGun[1][22] = 1;
          gosperGliderGun[1][24] = 1;

          gosperGliderGun[2][12] = 1;
          gosperGliderGun[2][13] = 1;
          gosperGliderGun[2][20] = 1;
          gosperGliderGun[2][21] = 1;
          gosperGliderGun[2][34] = 1;
          gosperGliderGun[2][35] = 1;

          gosperGliderGun[3][11] = 1;
          gosperGliderGun[3][15] = 1;
          gosperGliderGun[3][20] = 1;
          gosperGliderGun[3][21] = 1;
          gosperGliderGun[3][34] = 1;
          gosperGliderGun[3][35] = 1;

          gosperGliderGun[4][0] = 1;
          gosperGliderGun[4][1] = 1;
          gosperGliderGun[4][10] = 1;
          gosperGliderGun[4][16] = 1;
          gosperGliderGun[4][20] = 1;
          gosperGliderGun[4][21] = 1;

          gosperGliderGun[5][0] = 1;
          gosperGliderGun[5][1] = 1;
          gosperGliderGun[5][10] = 1;
          gosperGliderGun[5][14] = 1;
          gosperGliderGun[5][16] = 1;
          gosperGliderGun[5][17] = 1;
          gosperGliderGun[5][22] = 1;
          gosperGliderGun[5][24] = 1;

          gosperGliderGun[6][10] = 1;
          gosperGliderGun[6][16] = 1;
          gosperGliderGun[6][24] = 1;

          gosperGliderGun[7][11] = 1;
          gosperGliderGun[7][15] = 1;

          gosperGliderGun[8][12] = 1;
          gosperGliderGun[8][13] = 1;

          state.generations = [gosperGliderGun];
        },
      },
      "callback"
    )
    .name("Gosper glider gun");
}
