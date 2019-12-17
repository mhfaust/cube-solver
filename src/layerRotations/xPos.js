const nextCube = require('../nextCube')
const { 
    col,
    invert,
    replaceCol,
    maybefaceClockwise,
    maybefaceCounterClockwise,
    frontFace, 
    backFace, 
    topFace, 
    bottomFace,
} = require('../cubeUtils')


module.exports = (x, cubeSize = 3) => {

    const lastIndex = cubeSize - 1
    const xFromEnd = lastIndex - x
    const colX = col(x)
    const colOppositeX = col(xFromEnd)

    return nextCube({
        front: replaceCol(x, [topFace, colX]),
        back: replaceCol(xFromEnd, [bottomFace, colX, invert]),
        right: maybefaceCounterClockwise(x === lastIndex),
        left: maybefaceClockwise(x === 0),
        top: replaceCol(x, [backFace, colOppositeX, invert]),
        bottom: replaceCol(x, [frontFace, colX]),
    })
}
