const {
    clockwise,
    counterClockwise,
    down,
    up,
    left,
    right,
} = require('../layerRotations')

module.exports = {
    up: left(0, 3),
    up_inverted: right(0, 3),
    right: up(2, 3),
    right_inverted: down(2, 3),
    left: up(0, 3),
    up_inverted: down(0, 3),
    down: right(2, 3),
    down_inverted: left(2, 3),
    front: clockwise(0, 3),
    front_inverted: counterClockwise(0, 3),
    back: counterClockwise(2, 3),
    back_inverted: clockwise(2, 3)
}