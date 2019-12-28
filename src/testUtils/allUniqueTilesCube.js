const { nnArray } = require('../utils')

const allUniqueTilesCube = () => ['front', 'back', 'right', 'left', 'top', 'bottom']
.reduce(
    (cube, face) => ({
        ...cube,
        [face]: nnArray(3)((i,j) => `.${face}[${i}][${j}]`)
    })
    , {}
)

module.exports = { allUniqueTilesCube }