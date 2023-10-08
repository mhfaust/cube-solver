import { nnArray } from '../utils'

export const allUniqueTilesCube = () => ['front', 'back', 'right', 'left', 'top', 'bottom']
.reduce(
    (cube, faceName) => ({
        ...cube,
        [faceName]: nnArray(3)((i,j) => `.${faceName}[${i}][${j}]`)
    })
    , {}
)
