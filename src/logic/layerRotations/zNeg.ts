import nextCube from '../nextCube'
import { 
    row,
    col,
    invert,
    replaceRow,
    replaceCol,
    clockwiseIf,
    counterClockwiseIf,
    rightFace, 
    leftFace, 
    topFace, 
    bottomFace,
    I,
} from '../cubeUtils'


const zNeg = (z: I) => {

    const zFromEnd = 2 - z as I
    const rowZ = row(z)
    const colZ = col(z)
    const colOppositeZ = col(zFromEnd)
    const rowOppositeZ = row(zFromEnd)

    return nextCube({
        front: counterClockwiseIf(z === 0),
        back: clockwiseIf(z === 2),
        right: replaceCol(z, cube => invert(rowZ(bottomFace(cube)))),
        left: replaceCol(zFromEnd, cube => invert(rowOppositeZ(topFace(cube)))),
        top: replaceRow(zFromEnd, cube => colZ(rightFace(cube))),
        bottom: replaceRow(z, cube => colOppositeZ(leftFace(cube))),
    })
}

export default zNeg
