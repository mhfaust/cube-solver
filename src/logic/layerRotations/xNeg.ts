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
    backFace,
    I
} from'../cubeUtils'


const xNeg = (x: I) => {
    
    const xFromEnd = 2 - x as I
    const colX = col(x)
    const colOppositeX = col(xFromEnd)

    return nextCube({
        front: replaceCol(x, cube => colX(bottomFace(cube))),
        back: replaceCol(xFromEnd, cube => invert(colX(topFace(cube)))),
        right: clockwiseIf(x === 2),
        left: counterClockwiseIf(x === 0),
        top: replaceCol(x, cube => colX(frontFace(cube))),
        bottom: replaceCol(x, cube => invert(colOppositeX(backFace(cube)))),
    })
}

export default xNeg