/** 
 * COLORS
 */

import { useMemo } from "react"
import { Color, MeshBasicMaterial } from "three"
import { useThemeName } from "../store/selectors"
import { standardColors, brightColors } from "./assets"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import { COLOR_A_1, COLOR_A_2, COLOR_A_3, COLOR_Z_1, COLOR_Z_2, COLOR_Z_3 } from "@/logic/constants"

const grayScale = (n: number) => new Color(n,n,n)

export const themeNames = ['dark', 'light', 'neon'] as const
export type ThemeName = typeof themeNames[number]

const themes: Record<ThemeName, Theme> = {
  dark: {
    frameColor: grayScale(.05),
    backgroundColor: grayScale(.03),
    faceColors: standardColors,
    pointLightIntensity: 7,
    ambientLightIntensity: 2,
    boxRoundness: 0.1,
  },
  light: {
    frameColor: grayScale(.75),
    backgroundColor: grayScale(.03),
    faceColors: standardColors,
    pointLightIntensity: 10,
    ambientLightIntensity: 2,
    boxRoundness: 0.1,
  },
  neon: {
    frameColor: grayScale(.025),
    backgroundColor: grayScale(.0),
    faceColors: brightColors,
    pointLightIntensity: 6,
    ambientLightIntensity: 2,
    boxRoundness: 0.2,
  }
} as const


export type Theme = {
  frameColor: Color,
  backgroundColor: Color,
  faceColors: {
    [COLOR_A_1]: Color,
    [COLOR_A_2]: Color,
    [COLOR_A_3]: Color,
    [COLOR_Z_1]: Color,
    [COLOR_Z_2]: Color,
    [COLOR_Z_3]: Color,
  },
  pointLightIntensity: number,
  ambientLightIntensity: number,
  boxRoundness: number,
}

export const colorSequence = [COLOR_A_1,
COLOR_A_2,
COLOR_A_3,
COLOR_Z_1,
COLOR_Z_2,
COLOR_Z_3]

const useTheme = () => {
  const themeName = useThemeName()

  const { 
    frameColor, 
    faceColors, 
    backgroundColor, 
    pointLightIntensity, 
    ambientLightIntensity,
    boxRoundness,
  } = themes[themeName]

  return useMemo(() => ({
    frameColor,
    faceColors, 
    bgMaterial: new MeshBasicMaterial( { color: backgroundColor } ),
    pointLightIntensity,
    ambientLightIntensity,
    boxRoundness,
    blockGeometry: new RoundedBoxGeometry(1.0, 1.0, 1.0, 2, boxRoundness)
  }),[ambientLightIntensity, backgroundColor, boxRoundness, faceColors, frameColor, pointLightIntensity])
}

export default useTheme