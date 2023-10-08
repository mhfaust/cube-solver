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
} from '../cubeUtils'


export default  (z, cubeSize = 3) => {

    const lastIndex = cubeSize - 1
    const zFromEnd = lastIndex - z
    const rowZ = row(z)
    const colZ = col(z)
    const colOppositeZ = col(zFromEnd)
    const rowOppositeZ = row(zFromEnd)

    return nextCube({
        front: counterClockwiseIf(z === 0),
        back: clockwiseIf(z === lastIndex),
        right: replaceCol(z, [bottomFace, rowZ, invert]),
        left: replaceCol(zFromEnd, [topFace, rowOppositeZ, invert]),
        top: replaceRow(zFromEnd, [rightFace, colZ]),
        bottom: replaceRow(z, [leftFace, colOppositeZ]),
    })
}
