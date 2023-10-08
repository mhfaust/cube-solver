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
} from '../cubeUtils'


export default  (x, cubeSize = 3) => {

    const lastIndex = cubeSize - 1
    const xFromEnd = lastIndex - x
    const colX = col(x)
    const colOppositeX = col(xFromEnd)

    return nextCube({
        front: replaceCol(x, [topFace, colX]),
        back: replaceCol(xFromEnd, [bottomFace, colX, invert]),
        right: counterClockwiseIf(x === lastIndex),
        left: clockwiseIf(x === 0),
        top: replaceCol(x, [backFace, colOppositeX, invert]),
        bottom: replaceCol(x, [frontFace, colX]),
    })
}
