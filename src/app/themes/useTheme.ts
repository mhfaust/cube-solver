/** 
 * COLORS
 */

import { useMemo } from "react"
import { Color, MeshBasicMaterial } from "three"
import useAppStore, { themeNameSelector } from "../store/useAppStore"
import { standardColors, brightColors } from "./themeAssets"



const grayScale = (n: number) => new Color(n,n,n)

export type ThemeName = 'dark' | 'light' | 'bright'

const themes: Record<ThemeName, Theme> = {
  dark: {
    frameColor: grayScale(.05),
    backgroundColor: grayScale(.03),
    faceColors: standardColors,
    pointLightIntensity: 7,
    ambientLightIntensity: 2,
    boxRoundness: 0.1
  },
  light: {
    frameColor: grayScale(.75),
    backgroundColor: grayScale(.03),
    faceColors: standardColors,
    pointLightIntensity: 10,
    ambientLightIntensity: 2,
    boxRoundness: 0.1
  },
  bright: {
    frameColor: grayScale(.025),
    backgroundColor: grayScale(.0),
    faceColors: brightColors,
    pointLightIntensity: 6,
    ambientLightIntensity: 2,
    boxRoundness: .2
  }
} as const


export type Theme = {
  frameColor: Color,
  backgroundColor: Color,
  faceColors: [Color, Color, Color, Color, Color, Color],
  pointLightIntensity: number,
  ambientLightIntensity: number,
  boxRoundness: number,
}

const useTheme = () => {
  const themeName = useAppStore(themeNameSelector)

  const { 
    frameColor, 
    faceColors, 
    backgroundColor, 
    pointLightIntensity, 
    ambientLightIntensity,
    boxRoundness
  } = themes[themeName]

  return useMemo(() => ({
    frameColor,
    faceColors, 
    bgMaterial: new MeshBasicMaterial( { color: backgroundColor } ),
    pointLightIntensity,
    ambientLightIntensity,
    boxRoundness
  }),[ambientLightIntensity, backgroundColor, boxRoundness, faceColors, frameColor, pointLightIntensity])
}

export default useTheme