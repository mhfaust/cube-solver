const { zPos, zNeg, xPos, xNeg, yNeg, yPos, } = require('../layerRotations')

const fns = {
    up: yNeg(0, 3),
    up_inverted: yPos(0, 3),
    right: xNeg(2, 3),
    right_inverted: xPos(2, 3),
    left: xNeg(0, 3),
    up_inverted: xPos(0, 3),
    down: yPos(2, 3),
    down_inverted: yNeg(2, 3),
    front: zPos(0, 3),
    front_inverted: zNeg(0, 3),
    back: zNeg(2, 3),
    back_inverted: zPos(2, 3),
}

const fnKeys = Object.keys(fns)