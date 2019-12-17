const nextCube = require('../nextCube')
const { 
    row,
    replaceRow,
    maybefaceClockwise,
    maybefaceCounterClockwise, 
    frontFace, 
    rightFace, 
    backFace, 
    leftFace 
} = require('../cubeUtils')


module.exports = (y, cubeSize = 3) => {

    const lastIndex = cubeSize - 1
    const rowY = row(y)

    return nextCube({
        front: replaceRow(y, [leftFace, rowY]),
        back: replaceRow(y, [rightFace, rowY]),
        right: replaceRow(y, [frontFace, rowY]),
        left: replaceRow(y, [backFace, rowY]),
        top: maybefaceCounterClockwise(y === 0),
        bottom: maybefaceClockwise(y === lastIndex),
    })
}
