import nextCube from '../nextCube'
import { 
    row,
    replaceRow,
    clockwiseIf,
    counterClockwiseIf,
    frontFace, 
    rightFace, 
    backFace, 
    leftFace,
    I,
} from '../cubeUtils'


const yNeg =  (y: I) => {

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

export default yNeg
