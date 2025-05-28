import { COLOR_A_2, FaceColorCode, FaceName, COLOR_Z_2, COLOR_Z_1, COLOR_A_1, COLOR_Z_3, COLOR_A_3 } from './constants'

export type Line = [FaceColorCode, FaceColorCode, FaceColorCode]
export type Face = [Line, Line, Line]

export type CubeFaces = Record<FaceName, Face>

const lineOf = (color: FaceColorCode): [FaceColorCode, FaceColorCode, FaceColorCode] => [color, color, color]
export const faceOf = (color: FaceColorCode):Face => [lineOf(color), lineOf(color), lineOf(color)]

export const newCubeFaces = (): CubeFaces => ({
    front: faceOf(COLOR_A_3),
    back: faceOf(COLOR_Z_3),
    right: faceOf(COLOR_A_1),
    left: faceOf(COLOR_Z_1),
    top: faceOf(COLOR_A_2),
    bottom: faceOf(COLOR_Z_2),
})
