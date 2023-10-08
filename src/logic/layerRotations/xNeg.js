import nextCube from '../nextCube'
import { 
    col,
    invert,
    replaceCol,
    clockwiseIf,
    counterClockwiseIf, 
    bottomFace, 
    topFace, 
    frontFace, 
    backFace
} from'../cubeUtils'


export default   (x, cubeSize = 3) => {
    
    const lastIndex = cubeSize - 1
    const xFromEnd = lastIndex - x
    const colX = col(x)
    const colOppositeX = col(xFromEnd)

    return nextCube({
        front: replaceCol(x, [bottomFace, colX]),
        back: replaceCol(xFromEnd, [topFace, colX, invert]),
        right: clockwiseIf(x === lastIndex),
        left: counterClockwiseIf(x === 0),
        top: replaceCol(x, [frontFace, colX]),
        bottom: replaceCol(x, [backFace, colOppositeX, invert]),
    })
}
