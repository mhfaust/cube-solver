const { pipe } = require('ramda')
const { zPos, zNeg, xPos, xNeg, yNeg, yPos, } = require('../layerRotations')
const { zzzPos, zzzNeg, xxxPos, xxxNeg, yyyNeg, yyyPos, } = require('../cubeRotations')


const fns = {
    up: yNeg(0, 3),
    up_inverted: yPos(0, 3),
    right: xNeg(2, 3),
    right_inverted: xPos(2, 3),
    left: xPos(0, 3),
    left_inverted: xNeg(0, 3),
    down: yPos(2, 3),
    down_inverted: yNeg(2, 3),
    front: zPos(0, 3),
    front_inverted: zNeg(0, 3),
    back: zNeg(2, 3),
    back_inverted: zPos(2, 3),
    up2: pipe(yNeg(0, 3), yNeg(0, 3)),
    left2: pipe(xNeg(0, 3), xNeg(0, 3)),
    right2: pipe(xNeg(2, 3), xNeg(2, 3)),
    down2: pipe(yPos(2, 3), yPos(2, 3)),
    front2: pipe(zPos(0, 3), zPos(0, 3)),
    back2: pipe(zNeg(2, 3), zNeg(2, 3)),
    north: xxxNeg,
    south: xxxPos,
    east: yyyPos,
    west: yyyNeg,
}

const fnKeys = Object.keys(fns).reduce((obj, key) => ({ ...obj, [key]: key }), {})

module.exports = {
    ...fns,
    fnKeys
}