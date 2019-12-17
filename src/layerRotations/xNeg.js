const nextCube = require('../nextCube')
const { 
    col,
    invert,
    replaceCol,
    maybefaceClockwise,
    maybefaceCounterClockwise, 
    bottomFace, 
    topFace, 
    frontFace, 
    backFace
} = require('../cubeUtils')


module.exports =  (x, cubeSize = 3) => {
    
    const lastIndex = cubeSize - 1
    const xFromEnd = lastIndex - x
    const colX = col(x)
    const colOppositeY = col(xFromEnd)

    return nextCube({
        front: replaceCol(x, [bottomFace, colX]),
        back: replaceCol(xFromEnd, [topFace, colX, invert]),
        right: maybefaceClockwise(x === lastIndex),
        left: maybefaceCounterClockwise(x === 0),
        top: replaceCol(x, [frontFace, colX]),
        bottom: replaceCol(x, [backFace, colOppositeY, invert]),
    })
}
