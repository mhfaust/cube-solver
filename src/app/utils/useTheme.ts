/** 
 * COLORS
 */

import { useMemo } from "react"
import { Color, MeshBasicMaterial } from "three"
import useAppStore, { themeNameSelector } from "../store/useAppStore"



//standard colors:
const red = new Color(.5, 0, 0)
const orange = new Color(.6, .13, 0)
const blue = new Color(.0, .02, 1)
const green = new Color(0, .4, 0)
const white = new Color(1, 1, 1)
const yellow = new Color(.7, .7, 0)
const standardColors = [red, orange, blue, green, white, yellow] as Theme['faceColors']

const brightRed = new Color(1, .05, .05)
const brightGreen = new Color(0, .7, 0)
const brightBlue = new Color(.05, .05, 1)
const cyan = new Color(0, .4, .4)
const brightYellow = new Color(.9, .9, 0)
const magenta = new Color(1, 0, 1)
const brightColors = [brightGreen, magenta, brightBlue, brightYellow, brightRed, cyan] as Theme['faceColors']

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
    boxRoundness: .3
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