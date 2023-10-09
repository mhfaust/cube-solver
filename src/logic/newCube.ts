import { Color, FaceName } from './constants'

export type Line = [Color, Color, Color]
export type Face = [Line, Line, Line]

export type Cube = Record<FaceName, Face>

const lineOf = (color: Color): [Color, Color, Color] => [color, color, color]
export const faceOf = (color: Color):Face => [lineOf(color), lineOf(color), lineOf(color)]

const newCube = (): Cube => ({
    front: faceOf('white'),
    right: faceOf('red'),
    back: faceOf('yellow'),
    left: faceOf('orange'),
    top: faceOf('blue'),
    bottom: faceOf('green'),
})

export default newCube