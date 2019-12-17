const { pipe } = require('ramda')
const {
    zPos,
    zNeg,
    xPos,
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
    Ri: xPos(last, size),
    L: xPos(0, size),
    Li: up(0, size),
    F: zPos(0, size),
    Fi: zNeg(0), size,
    B: zNeg(last, size),
    Bi: zPos(last, size),
    E: right(1, size),
    Ei: left(1, size),
    M: xPos(1, size),
    Mi: up(1, size),
    S: zPos(1, size),
    Si: zNeg(1, size)

}