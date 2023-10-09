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
    I
} from '../cubeUtils'


const zPos = (z: I) => {

    const lastIndex = 2
    const zFromEnd = 2 - z as I
    const rowZ = row(z) 
    const colZ = col(z)
    const colOppositeZ = col(zFromEnd)
    const rowOppositeZ = row(zFromEnd)

    return nextCube({
        front: clockwiseIf(z === 0),
        back: counterClockwiseIf(z === lastIndex),
        right: replaceCol(z, cube => rowOppositeZ(topFace(cube))),
        left: replaceCol(zFromEnd, cube => rowZ(bottomFace(cube))),
        top: replaceRow(zFromEnd, cube => invert(colOppositeZ(leftFace(cube)))),
        bottom: replaceRow(z, cube => invert(colZ(rightFace(cube))))
    })
}

export default zPos
