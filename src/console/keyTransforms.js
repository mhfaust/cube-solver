const { U, Ui, D, Di, L, Li, R, Ri, B, Bi, F, Fi } = require('../layerRotations/advancedNotation')

const {
    north,
    south,
    east,
    west,
    tighten,
    loosen,
} = require('../cubeRotations')


module.exports = (cubeSize) => ({
    u: U,
    U: Ui,
    d: D,
    D: Di,
    l: L,
    L: Li,
    r: R,
    R: Ri,
    b: B,
    B: Bi,
    f: F,
    F: Fi,
    '0': north(cubeSize),
    ')': south(cubeSize),
    '-': east(cubeSize),
    '_': west(cubeSize),
    '=': tighten(cubeSize),
    '+': loosen(cubeSize)
})