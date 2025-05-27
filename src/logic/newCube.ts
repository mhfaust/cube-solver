import { COLOR_A_2, Color, FaceName, COLOR_Z_2, COLOR_Z_1, COLOR_A_1, COLOR_Z_3, COLOR_A_3 } from './constants'

export type Line = [Color, Color, Color]
export type Face = [Line, Line, Line]

export type CubeFaces = Record<FaceName, Face>

const lineOf = (color: Color): [Color, Color, Color] => [color, color, color]
export const faceOf = (color: Color):Face => [lineOf(color), lineOf(color), lineOf(color)]

export const newCubeFaces = (): CubeFaces => ({
    front: faceOf(COLOR_Z_3),
    right: faceOf(COLOR_A_1),
    back: faceOf(COLOR_A_3),
    left: faceOf(COLOR_Z_1),
    top: faceOf(COLOR_A_2),
    bottom: faceOf(COLOR_Z_2),
})
