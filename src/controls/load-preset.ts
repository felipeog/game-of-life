import { gui } from "./gui";
import { LOCAL_STORAGE_KEY } from "../constants/local-storage-key";

export function loadPreset() {
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
