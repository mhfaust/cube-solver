import { BLUE, Color, FaceName, GREEN, ORANGE, RED, WHITE, YELLOW } from './constants'

export type Line = [Color, Color, Color]
export type Face = [Line, Line, Line]

export type CubeFaces = Record<FaceName, Face>

const lineOf = (color: Color): [Color, Color, Color] => [color, color, color]
export const faceOf = (color: Color):Face => [lineOf(color), lineOf(color), lineOf(color)]

const newCube = (): CubeFaces => ({
    front: faceOf(WHITE),
    right: faceOf(RED),
    back: faceOf(YELLOW),
    left: faceOf(ORANGE),
    top: faceOf(BLUE),
    bottom: faceOf(GREEN),
})

export default newCube