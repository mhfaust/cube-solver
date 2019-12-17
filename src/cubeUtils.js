const { curry, pipe } = require('ramda')
const { nArray } = require('./utils')

const face = curry((faceName, cube) => cube[faceName])

const row = curry((rowIndex, face) => [...face[rowIndex]])

const col = curry((colIndex, face) => face.map(col => col[colIndex]))

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
    Object.keys(cube).reduce((c, name) => {
         c[name] = cloneFace(name, cube)
         return c 
    }, {} )
}
const replaceFace = (faceName, replacementFace, cube) => {
    return {
        ...cube,
        [faceName]: replacementFace
    }
}

const faceClockwise = curry((faceName, cube)  => {
    const srcFace = cube[faceName]
    return nArray(size(cube))(i => invert(col(i, srcFace)))
})
const maybefaceClockwise = (condition) => condition 
    ? faceClockwise 
    : cloneFace
    
const faceCounterClockwise = curry((faceName, cube)  => {
    const srcFace = cube[faceName]
    const cubeSize = size(cube)
    return nArray(cubeSize)(i => col(cubeSize -1 - i, srcFace))
})
const maybefaceCounterClockwise = (condition) => condition 
    ? faceCounterClockwise 
    : cloneFace

const face180 = curry((faceName, cube) => {
    const rotated90 = {
        ...cube,
        [faceName]: faceClockwise(faceName, cube)
    }
    return faceClockwise(faceName, rotated90)
})

const frontFace =  face('front')
const rightFace =  face('right')
const backFace =  face('back')
const leftFace =  face('left')
const topFace =  face('top')
const bottomFace =  face('bottom')

module.exports = {
    row,
    col,
    invert,
    replaceRow,
    replaceCol,
    cloneCube,
    faceClockwise,
    faceCounterClockwise,
    maybefaceClockwise,
    maybefaceCounterClockwise,
    face,
    face180,
    frontFace,
    rightFace,
    backFace,
    leftFace,
    topFace,
    bottomFace,
}