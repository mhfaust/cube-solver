import { nextCube } from '../nextCube'
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
} from '../cubeUtils'


export const zNeg = (z: 0|1|2) => {

    const zFromEnd = 2 - z as 0|1|2
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
