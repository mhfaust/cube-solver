import { nextCube } from '../nextCube'
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
} from '../cubeUtils'

export const xPos = (x: 0|1|2) => {

    const xFromEnd = 2 - x as 0|1|2
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
