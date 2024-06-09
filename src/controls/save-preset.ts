import { gui } from "./gui";
import { LOCAL_STORAGE_KEY } from "../constants/local-storage-key";

export function savePreset() {
  const preset = gui.save();

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preset));
}
