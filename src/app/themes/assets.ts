import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Theme } from "./useTheme";

import { Color } from "three";


//standard colors:
const red = new Color(0.5, 0, 0)
const orange = new Color(0.6, 0.13, 0)
const blue = new Color(0, 0.02, 1)
const green = new Color(0, 0.4, 0)
const white = new Color(1, 1, 1)
const yellow = new Color(0.7, 0.7, 0)
export const standardColors = [red, orange, blue, green, white, yellow] as Theme['faceColors']

const brightRed = new Color(1, 0.05, 0.05)
const brightGreen = new Color(0, 0.7, 0)
const brightBlue = new Color(0.05, 0.05, 1)
const cyan = new Color(0, 0.4, 0.4)
const brightYellow = new Color(0.9, 0.9, 0)
const magenta = new Color(1, 0, 1)
export const brightColors = [brightGreen, magenta, brightBlue, brightYellow, brightRed, cyan] as Theme['faceColors']

export const standardBox = new RoundedBoxGeometry(1.0, 1.0, 1.0, 2, .1)
export const curvierBox = new RoundedBoxGeometry(1.0, 1.0, 1.0, 2, .2)
