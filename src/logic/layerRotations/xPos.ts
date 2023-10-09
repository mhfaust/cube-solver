import nextCube from '../nextCube'
import { 
    col,
    invert,
    replaceCol,
    clockwiseIf,
    counterClockwiseIf,
    frontFace, 
    backFace, 
    topFace, 
    bottomFace,
    I,
} from '../cubeUtils'

const xPos = (x: I) => {

    const xFromEnd = 2 - x as I
    const colX = col(x)
    const colOppositeX = col(xFromEnd)

    return nextCube({
        front: replaceCol(x, cube => colX(topFace(cube))),
        back: replaceCol(xFromEnd, cube =>  invert(colX(bottomFace(cube)))),
        right: counterClockwiseIf(x === 2),
        left: clockwiseIf(x === 0),
        top: replaceCol(x, cube => invert(colOppositeX(backFace(cube)))),
        bottom: replaceCol(x, cube =>  colX(frontFace(cube))),
    })
}

export default xPos