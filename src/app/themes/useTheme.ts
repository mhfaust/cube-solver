/** 
 * COLORS
 */

import { useMemo } from "react"
import { BufferGeometry, Color, MeshBasicMaterial } from "three"
import useAppStore from "@/app/store/useAppStore"
import { useThemeName } from "../store/selectors"
import { standardColors, brightColors, standardBox, curvierBox } from "./assets"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"



const grayScale = (n: number) => new Color(n,n,n)

export type ThemeName = 'dark' | 'light' | 'neon'

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
  faceColors: [Color, Color, Color, Color, Color, Color],
  pointLightIntensity: number,
  ambientLightIntensity: number,
  boxRoundness: number,
}

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
    cubeGeometry: new RoundedBoxGeometry(1.0, 1.0, 1.0, 2, boxRoundness)
  }),[ambientLightIntensity, backgroundColor, boxRoundness, faceColors, frameColor, pointLightIntensity])
}

export default useTheme