import { curry, pipe } from 'ramda'
import { nArray } from './utils'
import { FRONT, RIGHT, BACK, LEFT, TOP, BOTTOM } from './constants'

export const face = (faceName) => (cube) => cube[faceName]

export const row = curry((rowIndex, face) => [...face[rowIndex]])

export const col = curry((colIndex, face) => face.map(col => col[colIndex]))

export const tile = curry((faceName, row, col, cube) => cube[faceName][row][col])

export const invert = (line) => line.slice(0).reverse()

const size = (cube) => (cube['front'] || []).length

export const replaceRow =  curry((destRowIndex, srcPipeline, destFaceName, cube) => {
    return cube[destFaceName].map((row, i) => i == destRowIndex 
        ? pipe(...srcPipeline)(cube) 
        : row.slice(0))
})

export const replaceCol = curry((destColIndex, srcPipeline, destFaceName, cube) => {
    const repl = pipe(...srcPipeline)(cube)
    return cube[destFaceName].map((row, rowIndex) => {
        return row.map((tile, i) => i === destColIndex ? repl[rowIndex] : tile)
    })
})  

const cloneFace = (faceName, cube) => cube[faceName].map(row => row.slice(0))

export const cloneCube = (cube) => {
    Object.keys(cube).reduce((clone, name) => {
         clone[name] = cloneFace(name, cube)
         return clone
    }, {} )
}
const faceClockwise = curry((faceName, cube)  => {
    const srcFace = cube[faceName]
    return nArray(size(cube))(i => invert(col(i, srcFace)))
})

export const clockwiseIf = (condition) => condition 
    ? faceClockwise 
    : cloneFace
    
const faceCounterClockwise = curry((faceName, cube)  => {
    const srcFace = cube[faceName]
    const cubeSize = size(cube)
    return nArray(cubeSize)(i => col(cubeSize -1 - i, srcFace))
})

export const counterClockwiseIf = (condition) => condition 
    ? faceCounterClockwise 
    : cloneFace

export const face180 = curry((faceName, cube) => {
    const rotated90 = {
        ...cube,
        [faceName]: faceClockwise(faceName, cube)
    }
    return faceClockwise(faceName, rotated90)
})

const oppositeFaces = Object.freeze({
    [FRONT]: BACK,
    [BACK]: FRONT,
    [LEFT]: RIGHT,
    [RIGHT]: LEFT,
    [TOP]: BOTTOM,
    [BOTTOM]: TOP
})

export const oppositeFace = faceName => {
    return oppositeFaces[faceName]
}

//coords for 5 tiles of a face that form the "cross" pattern, including the center
export const crossTiles = (face) => [
    face[0][1], 
    face[1][0], 
    face[1][1], 
    face[1][2], 
    face[2][1], 
]

//coords for 4 tiles of a face that form the "cross" pattern, excluding the center
export const crossEnds = (face) => [
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

export default  {
    row,
    col,
    tile,
    invert,
    replaceRow,
    replaceCol,
    cloneCube,
    faceClockwise,
    faceCounterClockwise,
    clockwiseIf,
    counterClockwiseIf,
    face,
    face180,
    oppositeFace,
    crossTiles,
    crossEnds
}