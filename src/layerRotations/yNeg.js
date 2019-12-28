const nextCube = require('../nextCube')
const { 
    row,
    replaceRow,
    clockwiseIf,
    counterClockwiseIf,
    frontFace, 
    rightFace, 
    backFace, 
    leftFace,
} = require('../cubeUtils')


module.exports = (y, cubeSize = 3) => {

    const lastIndex = cubeSize - 1
    const rowY = row(y)

    return nextCube({
        front: replaceRow(y, [rightFace, rowY]),
        back: replaceRow(y, [leftFace, rowY]),
        right: replaceRow(y, [backFace, rowY]),
        left: replaceRow(y, [frontFace, rowY]),
        top: clockwiseIf(y === 0),
        bottom: counterClockwiseIf(y === lastIndex),
    })
}

