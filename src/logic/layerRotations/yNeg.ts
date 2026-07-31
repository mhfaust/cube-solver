import { nextCube } from '../nextCube'
import { 
    row,
    replaceRow,
    clockwiseIf,
    counterClockwiseIf,
    frontFace, 
    rightFace, 
    backFace, 
    leftFace,
} from '../cubeUtils'


/**
 * Returns a transform that rotates the selected Y layer in negative direction.
 *
 * @param y - Layer index.
 */
export const yNeg =  (y: 0|1|2) => {

    const rowY = row(y)

    return nextCube({
        front: replaceRow(y, cube => rowY(rightFace(cube))),
        back: replaceRow(y, cube => rowY(leftFace(cube))),
        right: replaceRow(y, cube => rowY(backFace(cube))),
        left: replaceRow(y, cube => rowY(frontFace(cube))),
        top: clockwiseIf(y === 0),
        bottom: counterClockwiseIf(y === 2),
    })
}
