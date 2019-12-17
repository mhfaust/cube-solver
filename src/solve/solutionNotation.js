const {
    zPos,
    zNeg,
    xPos,
    xNeg,
    left,
    right,
} = require('../layerRotations')

module.exports = {
    up: left(0, 3),
    up_inverted: right(0, 3),
    right: xNeg(2, 3),
    right_inverted: xPos(2, 3),
    left: xNeg(0, 3),
    up_inverted: xPos(0, 3),
    down: right(2, 3),
    down_inverted: left(2, 3),
    front: zPos(0, 3),
    front_inverted: zNeg(0, 3),
    back: zNeg(2, 3),
    back_inverted: zPos(2, 3)
}