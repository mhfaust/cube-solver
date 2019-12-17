const { pipe } = require('ramda')
const {
    zPos,
    zNeg,
    xPos,
    xNeg,
    yNeg,
    right,
} = require('.')

const size = 3
const last = size -1

module.exports = {
    U: yNeg(0, size),
    Ui: right(0, size),
    D: right(last, size),
    Di: yNeg(last, size),
    U2: pipe(yNeg(0, size), yNeg(0, size)),
    R: xNeg(last, size),
    Ri: xPos(last, size),
    L: xPos(0, size),
    Li: xNeg(0, size),
    F: zPos(0, size),
    Fi: zNeg(0), size,
    B: zNeg(last, size),
    Bi: zPos(last, size),
    E: right(1, size),
    Ei: yNeg(1, size),
    M: xPos(1, size),
    Mi: xNeg(1, size),
    S: zPos(1, size),
    Si: zNeg(1, size)

}