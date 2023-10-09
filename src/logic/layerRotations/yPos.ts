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
    I
} from '../cubeUtils'


const yPos = (y: I) => {

    const rowY = row(y)

    return nextCube({
        front: replaceRow(y, cube => rowY(leftFace(cube))),
        back: replaceRow(y, cube => rowY(rightFace(cube))),
        right: replaceRow(y, cube => rowY(frontFace(cube))),
        left: replaceRow(y, cube => rowY(backFace(cube))),
        top: counterClockwiseIf(y === 0),
        bottom: clockwiseIf(y === 2),
    })
}

export default yPos
