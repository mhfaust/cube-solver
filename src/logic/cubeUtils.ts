import { FRONT, RIGHT, BACK, LEFT, TOP, BOTTOM, FaceName } from './constants'
import { Cube, Face, Line } from './newCube'
import { CubeTransform } from './nextCube'

export type I = 0 | 1 | 2

export type TileLocator = {
    faceName: FaceName,
    row: I,
    col: I
}

export const face = (faceName: FaceName) => (cube: Cube) => cube[faceName]

export const row = (rowIndex: number) => (face: Face): Line => [...face[rowIndex]]

export const col = (i: number) => (face: Face): Line => [face[i][0], face[i][1], face[i][2]]

export const tile = (faceName: FaceName) => (row: number, col: number) =>  (cube: Cube) => cube[faceName][row][col]

export const invert = ([a, b, c]: Line): Line => [b, c, a]

type GetLine = (cube: Cube) => Line

export const replaceRow =  (destRowIndex: I, getLine: GetLine) => {
    return (destFaceName: FaceName, cube: Cube): Face => {
        return (cube[destFaceName].map(([a,b,c], i) => i == destRowIndex 
                ? (getLine(cube))
                : [a,b,c]
            ) as Face)
}}

export const replaceCol = (destColIndex: I, getLine: GetLine) => { 
    return (destFaceName: FaceName, cube: Cube): Face => {
        const repl = getLine(cube)
        return cube[destFaceName].map((row, rowIndex) => {
            return row.map((tile, i) => i === destColIndex ? repl[rowIndex] : tile) as Line
        }) as Face
}}

const cloneFace = (faceName: FaceName, cube: Cube): Face =>  {
    const [[a1, b1, c1], [a2, b2, c2], [a3, b3, c3]] = cube[faceName]
    return [[a1, b1, c1], [a2, b2, c2], [a3, b3, c3]]
}

export const cloneCube = (cube: Cube): Cube => {
    return {
        front: cloneFace('front', cube),
        right: cloneFace('right', cube),
        back: cloneFace('back', cube),
        left: cloneFace('left', cube),
        top: cloneFace('top', cube),
        bottom: cloneFace('bottom', cube),
    }
}
export const faceClockwise = (faceName: FaceName, cube: Cube) => {
    const srcFace = cube[faceName]
    return [0,1,2].map((i) => invert(col(i)(srcFace))) as Face
}

export const clockwiseIf = (condition: Boolean) => condition 
    ? faceClockwise 
    : cloneFace
    
export const faceCounterClockwise = (faceName: FaceName, cube: Cube)  => {
    const srcFace = cube[faceName]
    return [0,1,2].map((i) => col(2 - i)(srcFace)) as Face
}

export const counterClockwiseIf = (condition: Boolean) => condition 
    ? faceCounterClockwise 
    : cloneFace

export const face180 = (faceName: FaceName, cube: Cube) => {
    const rotated90 = {
        ...cube,
        [faceName]: faceClockwise(faceName, cube)
    }
    return faceClockwise(faceName, rotated90)
}

const oppositeFaces = Object.freeze({
    [FRONT]: BACK,
    [BACK]: FRONT,
    [LEFT]: RIGHT,
    [RIGHT]: LEFT,
    [TOP]: BOTTOM,
    [BOTTOM]: TOP
})

export const oppositeFace = (faceName: FaceName) => {
    return oppositeFaces[faceName]
}

//coords for 5 tiles of a face that form the "cross" pattern, including the center
export const crossTiles = (face: Face) => [
    face[0][1], 
    face[1][0], 
    face[1][1], 
    face[1][2], 
    face[2][1], 
]

//coords for 4 tiles of a face that form the "cross" pattern, excluding the center
export const crossEnds = (face: Face) => [
    face[0][1], 
    face[1][0], 
    face[1][2], 
    face[2][1], 
]

export const frontFace = face(FRONT)
export const rightFace = face(RIGHT)
export const backFace = face(BACK)
export const leftFace = face(LEFT)
export const topFace = face(TOP)
export const bottomFace = face(BOTTOM)

const recursePipe = (cube: Cube, transforms: CubeTransform[], i: number): Cube => {
    return transforms[i](i === transforms.length - 1 
        ? cube 
        : recursePipe(cube, transforms, i + 1)
)}

export const pipe = (...transforms: CubeTransform[]): CubeTransform => {
    return (cube: Cube) => recursePipe(cube, transforms, 0)
}