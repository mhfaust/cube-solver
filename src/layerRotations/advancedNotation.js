const { pipe } = require('ramda')
const {
    clockwise,
    counterClockwise,
    down,
    up,
    left,
    right,
} = require('.')

const size = 3
const last = size -1

module.exports = {
    U: left(0, size),
    Ui: right(0, size),
    D: right(last, size),
    Di: left(last, size),
    U2: pipe(left(0, size), left(0, size)),
    R: up(last, size),
    Ri: down(last, size),
    L: down(0, size),
    Li: up(0, size),
    F: clockwise(0, size),
    Fi: counterClockwise(0), size,
    B: counterClockwise(last, size),
    Bi: clockwise(last, size),
    E: right(1, size),
    Ei: left(1, size),
    M: down(1, size),
    Mi: up(1, size),
    S: clockwise(1, size),
    Si: counterClockwise(1, size)

}