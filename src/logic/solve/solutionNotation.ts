import { zPos, zNeg, xPos, xNeg, yNeg, yPos,  } from '../layerRotations'
import { xxxPos, xxxNeg, yyyNeg, yyyPos,  } from '../cubeRotations'
import { pipe } from '../cubeUtils'

const solutionNotation = {
    up : yNeg(0),
    up_inverted : yPos(0),
    right : xNeg(2),
    right_inverted : xPos(2),
    left : xPos(0),
    left_inverted : xNeg(0),
    down : yPos(2),
    down_inverted : yNeg(2),
    front : zPos(0),
    front_inverted : zNeg(0),
    back : zNeg(2),
    back_inverted : zPos(2),
    up2 : pipe(yNeg(0), yNeg(0)),
    left2 : pipe(xNeg(0), xNeg(0)),
    right2 : pipe(xNeg(2), xNeg(2)),
    down2 : pipe(yPos(2), yPos(2)),
    front2 : pipe(zPos(0), zPos(0)),
    back2 : pipe(zNeg(2), zNeg(2)),
    north : xxxNeg,
    south : xxxPos,
    east : yyyPos,
    west : yyyNeg,
} 

export type FnName = keyof typeof solutionNotation

export default solutionNotation