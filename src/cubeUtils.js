const { curry, pipe } = require('ramda')
const { nArray } = require('./utils')
const { FRONT, RIGHT, BACK, LEFT, TOP, BOTTOM } = require('./constants')

const face = curry((faceName, cube) => cube[faceName])

const row = curry((rowIndex, face) => [...face[rowIndex]])

const col = curry((colIndex, face) => face.map(col => col[colIndex]))

const tile = curry((faceName, row, col, cube) => cube[faceName][row][col])

const invert = (line) => line.slice(0).reverse()

const size = (cube) => (cube['front'] || []).length

const replaceRow =  curry((destRowIndex, srcPipeline, destFaceName, cube) => {
    return cube[destFaceName].map((row, i) => i == destRowIndex 
        ? pipe(...srcPipeline)(cube) 
        : row.slice(0))
})

const replaceCol = curry((destColIndex, srcPipeline, destFaceName, cube) => {
    const repl = pipe(...srcPipeline)(cube)
    return cube[destFaceName].map((row, rowIndex) => {
        return row.map((tile, i) => i === destColIndex ? repl[rowIndex] : tile)
    })
})  

const cloneFace = (faceName, cube) => cube[faceName].map(row => row.slice(0))

const cloneCube = (cube) => {
    Object.keys(cube).reduce((clone, name) => {
         clone[name] = cloneFace(name, cube)
         return clone
    }, {} )
}
const faceClockwise = curry((faceName, cube)  => {
    const srcFace = cube[faceName]
    return nArray(size(cube))(i => invert(col(i, srcFace)))
})

const clockwiseIf = (condition) => condition 
    ? faceClockwise 
    : cloneFace
    
const faceCounterClockwise = curry((faceName, cube)  => {
    const srcFace = cube[faceName]
    const cubeSize = size(cube)
    return nArray(cubeSize)(i => col(cubeSize -1 - i, srcFace))
})

const counterClockwiseIf = (condition) => condition 
    ? faceCounterClockwise 
    : cloneFace

const face180 = curry((faceName, cube) => {
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

const oppositeFace = faceName => {
    return oppositeFaces[faceName]
}

//coords for 5 tiles of a face that form the "cross" pattern, including the center
const crossTiles = (face) => [
    face[0][1], 
    face[1][0], 
    face[1][1], 
    face[1][2], 
    face[2][1], 
]

//coords for 4 tiles of a face that form the "cross" pattern, excluding the center
const crossEnds = (face) => [
    face[0][1], 
    face[1][0], 
    face[1][2], 
    face[2][1], 
]

const frontFace = face(FRONT)
const rightFace = face(RIGHT)
const backFace = face(BACK)
const leftFace = face(LEFT)
const topFace = face(TOP)
const bottomFace = face(BOTTOM)

module.exports = {
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
    frontFace,
    rightFace,
    backFace,
    leftFace,
    topFace,
    bottomFace,
    crossTiles,
    crossEnds
}