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
    bottomFace
} = require('../cubeUtils')


module.exports = (z, cubeSize = 3) => {

    const lastIndex = cubeSize - 1
    const zFromEnd = lastIndex - z
    const rowZ = row(z) 
    const colZ = col(z)
    const colOppositeZ = col(zFromEnd)
    const rowOppositeZ = row(zFromEnd)

    return nextCube({
        front: maybefaceClockwise(z === 0),
        back: maybefaceCounterClockwise(z === lastIndex),
        right: replaceCol(z, [topFace, rowOppositeZ]),
        left: replaceCol(zFromEnd, [bottomFace, rowZ]),
        top: replaceRow(zFromEnd, [leftFace, colOppositeZ, invert]),
        bottom: replaceRow(z, [rightFace, colZ, invert])
    })
}
