const { nnArray } = require('../utils')

const allUniqueTilesCube = () => ['front', 'back', 'right', 'left', 'top', 'bottom']
.reduce(
    (cube, faceName) => ({
        ...cube,
        [faceName]: nnArray(3)((i,j) => `.${faceName}[${i}][${j}]`)
    })
    , {}
)

module.exports = { allUniqueTilesCube }