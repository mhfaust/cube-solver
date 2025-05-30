import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Theme } from "./useThemeAssets";

import { Color } from "three";
import { COLOR_A_1, COLOR_Z_1, COLOR_A_2, COLOR_Z_2, COLOR_A_3, COLOR_Z_3 } from "@/logic/constants";


//standard colors:
const red = new Color(0.5, 0, 0)
// const orange = new Color(0.6, 0.13, 0)
const purple = new Color(0.25, 0, 0.4)
const blue = new Color(0, 0.02, 1)
const green = new Color(0, 0.4, 0)
const white = new Color(1, 1, 1)
const yellow = new Color(0.7, 0.7, 0)

export const standardColors = {
    [COLOR_A_1]: red, 
    [COLOR_Z_1]: purple, 
    [COLOR_A_2]: blue, 
    [COLOR_Z_2]: green, 
    [COLOR_A_3]: white, 
    [COLOR_Z_3]: yellow
} as Theme['faceColors']

const brightRed = new Color(1, 0.05, 0.05)
const brightGreen = new Color(0, 0.7, 0)
const brightBlue = new Color(0.05, 0.05, 1)
const cyan = new Color(0, 0.4, 0.4)
const brightYellow = new Color(0.9, 0.9, 0)
const magenta = new Color(1, 0, 1)

export const brightColors = {
    [COLOR_A_1]: magenta, 
    [COLOR_Z_1]: brightGreen, 
    [COLOR_A_2]: brightYellow, 
    [COLOR_Z_2]: brightBlue, 
    [COLOR_A_3]: cyan, 
    [COLOR_Z_3]: brightRed
} as Theme['faceColors']

// export const standardBox = new RoundedBoxGeometry(1.0, 1.0, 1.0, 2, .1)
// export const curvierBox = new RoundedBoxGeometry(1.0, 1.0, 1.0, 2, .2)
