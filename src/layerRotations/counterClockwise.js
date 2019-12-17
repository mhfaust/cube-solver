const nextCube = require('../nextCube')
const { 
    row,
    col,
    invert,
    replaceRow,
    replaceCol,
    maybefaceClockwise,
    maybefaceCounterClockwise,
    rightFace, 
    leftFace, 
    topFace, 
    bottomFace,
} = require('../cubeUtils')


module.exports = (z, cubeSize = 3) => {

    const lastIndex = cubeSize - 1
    const zFromEnd = lastIndex - z
    const rowZ = row(z)
    const colZ = col(z)
    const colOppositeZ = col(zFromEnd)
    const rowOppositeZ = row(zFromEnd)

    return nextCube({
        front: maybefaceCounterClockwise(z === 0),
        back: maybefaceClockwise(z === lastIndex),
        right: replaceCol(z, [bottomFace, rowZ, invert]),
        left: replaceCol(zFromEnd, [topFace, rowOppositeZ, invert]),
        top: replaceRow(zFromEnd, [rightFace, colZ]),
        bottom: replaceRow(z, [leftFace, colOppositeZ]),
    })
}
