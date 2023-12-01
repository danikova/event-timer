import { Hsl } from "./hue";
import { atom } from "jotai";

export const dominantColorsAtom = atom<Hsl[]>([]);
